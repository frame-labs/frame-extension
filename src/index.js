/* globals chrome */

const ethProvider = require('eth-provider')
const provider = ethProvider('ws://127.0.0.1:1248?identity=frame-extension')

const subs = {}
const pending = {}

const getOrigin = url => {
  const path = url.split('/')
  return path[0] + '//' + path[2]
}

chrome.browserAction.setPopup({ popup: 'settings.html' })

const frameState = {
  connected: false,
  availableChains: []
}

function setChains (chains) {
  frameState.availableChains = chains.map(c => parseInt(c))
}

provider.on('connect', () => {
  frameState.connected = true

  provider.request({ method: 'wallet_getChains' }).then(setChains)
})

provider.on('disconnect', () => { frameState.connected = false })
provider.on('chainsChanged', setChains)

chrome.runtime.onConnect.addListener((port, msg) => {
  if (port.name === 'frame_connect') {
    port.onMessage.addListener(() => {
      port.postMessage(frameState)
    })
  }
})

provider.connection.on('payload', payload => {
  if (typeof payload.id !== 'undefined') {
    if (pending[payload.id]) {
      const { tabId, payloadId } = pending[payload.id]
      if (pending[payload.id].method === 'eth_subscribe' && payload.result) {
        subs[payload.result] = { tabId, send: subload => chrome.tabs.sendMessage(tabId, subload) }
      } else if (pending[payload.id].method === 'eth_unsubscribe') {
        const params = payload.params ? [].concat(payload.params) : []
        params.forEach(sub => delete subs[sub])
      }
      chrome.tabs.sendMessage(tabId, Object.assign({}, payload, { id: payloadId, type: 'eth:payload' }))
      delete pending[payload.id]
    }
  } else if (payload.method && payload.method.indexOf('_subscription') > -1 && subs[payload.params.subscription]) { // Emit subscription result to tab
    payload.type = 'eth:payload'
    subs[payload.params.subscription].send(payload)
  }
})

chrome.runtime.onMessage.addListener(async (payload, sender, sendResponse) => {
  const { method, params, tab } = payload

  if (payload.method === 'media_blob') {
    const location = payload.location
    fetch(payload.src).then(res => res.blob()).then(blob => {
      const blobURL = URL.createObjectURL(blob)
      chrome.tabs.executeScript(sender.tab.id, {
        code: `window.__setMediaBlob__("${blobURL}", "${location}");`
      })
    }).catch(e => {
      chrome.tabs.executeScript(sender.tab.id, {
        code: `window.__setMediaBlob__("${blobURL}", "${location}", "${e.message});`
      })
    })
  }

  if (payload.method === 'frame_summon') return provider.connection.send({ jsonrpc: '2.0', id: 1, method, params })
  
  const id = provider.nextId++
  pending[id] = { tabId: sender?.tab?.id || tab.id, payloadId: payload.id, method }
  const load = { jsonrpc: '2.0', id, method, params, __frameOrigin: getOrigin((tab || {}).url || sender.url) }

  provider.connection.send(load)
})


// chrome.browserAction.onClicked.addListener(tab => {
//   if (provider.connected) {
//     const load = { jsonrpc: '2.0', id: 1, method: 'frame_summon', params: [] }
//     provider.connection.send(load)
//   } else {
//     if (provider && provider.close) provider.close()
//     provider = ethProvider('ws://127.0.0.1:1248?identity=frame-extension')
//   }
// })

const unsubscribeTab = tabId => {
  Object.keys(pending).forEach(id => { if (pending[id].tabId === tabId) delete pending[id] })
  Object.keys(subs).forEach(sub => {
    if (subs[sub].tabId === tabId) {
      provider.send({ jsonrpc: '2.0', id: 1, method: 'eth_unsubscribe', params: [sub] })
      delete subs[sub]
    }
  })
}

chrome.tabs.onRemoved.addListener((tabId, removed) => unsubscribeTab(tabId))
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => { if (changeInfo.url) unsubscribeTab(tabId) })
