import ethProvider from 'eth-provider'
let provider

const subs = {}
const pending = {}

const originFromUrl = (url) => {
  const path = url.split('/')
  return `${path[0]}//${path[2]}`
}
const getOrigin = (tab = {}, sender = {}) => originFromUrl(tab.url || sender.url)

chrome.browserAction.setPopup({ popup: 'settings.html' })
chrome.browserAction.setIcon({ path: 'icons/icon96moon.png' })

const frameState = {
  connected: false,
  availableChains: [],
  currentChain: ''
}

function setChains(chains) {
  frameState.availableChains = chains
  if (settingsPanel) settingsPanel.postMessage(frameState)
}

function setCurrentChain(chain) {
  frameState.currentChain = chain
  if (settingsPanel) settingsPanel.postMessage(frameState)
}

function initProvider() {
  provider = ethProvider('ws://127.0.0.1:1248?identity=frame-extension')
  provider.on('connect', () => {
    frameState.connected = true
    if (settingsPanel) settingsPanel.postMessage(frameState)
    provider
      .request({ method: 'wallet_getEthereumChains' })
      .then(setChains)
      .catch(() => setChains([]))

    // change icon
    chrome.browserAction.setIcon({ path: 'icons/icon96good.png' })

    sendEvent('connect')
  })

  provider.on('disconnect', () => {
    frameState.connected = false
    if (settingsPanel) settingsPanel.postMessage(frameState)

    // change icon
    chrome.browserAction.setIcon({ path: 'icons/icon96moon.png' })

    sendEvent('close')
  })

  provider.on('chainsChanged', (chains = []) => {
    if (chains[0] && chains[0] !== null && typeof chains[0] === 'object') {
      setChains(chains)
    }
  })

  provider.connection.on('payload', (payload) => {
    if (typeof payload.id !== 'undefined') {
      if (pending[payload.id]) {
        const { tabId, payloadId } = pending[payload.id]
        if (pending[payload.id].method === 'eth_subscribe' && payload.result) {
          subs[payload.result] = {
            tabId,
            send: (subload) => chrome.tabs.sendMessage(tabId, subload),
            type: subType(pending[payload.id])
          }
        } else if (pending[payload.id].method === 'eth_unsubscribe') {
          const params = payload.params ? [].concat(payload.params) : []
          params.forEach((sub) => delete subs[sub])
        }
        chrome.tabs.sendMessage(tabId, Object.assign({}, payload, { id: payloadId, type: 'eth:payload' }))
        if (pending[payload.id].method === 'eth_chainId' && pending[payload.id].tabId === activeTab) {
          const chainId = payload.result
          if (chainId) setCurrentChain(chainId)
        }
        delete pending[payload.id]
      }
    } else if (
      payload.method &&
      payload.method.indexOf('_subscription') > -1 &&
      subs[payload.params.subscription]
    ) {
      // Emit subscription result to tab
      const sub = subs[payload.params.subscription]
      payload.type = 'eth:payload'
      sub.send(payload)
      if (sub.type === 'chainChanged' && sub.tabId === activeTab) {
        const chainId = payload.params?.result
        if (chainId) setCurrentChain(chainId)
      }
    }
  })
}

let settingsPanel, activeTab

function portDisconnected(port) {
  settingsPanel = null
  port.onDisconnect.removeListener(portDisconnected)
}

chrome.runtime.onConnect.addListener((port) => {
  port.onDisconnect.addListener(portDisconnected)

  if (port.name === 'frame_connect') {
    settingsPanel = port
    settingsPanel.postMessage(frameState)
  }
})

chrome.idle.onStateChanged.addListener((state) => {
  if (state === 'active') {
    initProvider()
  }
})

const subTypes = [
  'chainChanged',
  'chainsChanged',
  'accountsChanged',
  'assetsChanged',
  'networkChanged',
  'message'
]
const subType = (pendingPayload) => {
  try {
    const type = pendingPayload.params[0]
    return subTypes.includes(type) ? type : 'unknown'
  } catch (e) {
    return 'unknown'
  }
}

chrome.runtime.onMessage.addListener(async (extensionPayload, sender, _sendResponse) => {
  const { tab, ...payload } = extensionPayload
  const { method, params } = payload

  if (payload.method === 'embedded_action_res') {
    const [action, res] = params
    if (action.type === 'getChainId' && res.chainId) return setCurrentChain(res.chainId)
  } else if (payload.method === 'media_blob') {
    const location = payload.location
    fetch(payload.src)
      .then((res) => res.blob())
      .then((blob) => {
        const blobURL = URL.createObjectURL(blob)
        chrome.tabs.executeScript(sender.tab.id, {
          code: `window.__setMediaBlob__("${blobURL}", "${location}");`
        })
      })
      .catch(() => {
        // TODO: blobURL is undefined here
        // chrome.tabs.executeScript(sender.tab.id, {
        //   code: `window.__setMediaBlob__("${blobURL}", "${location}", "${e.message});`
        // })
      })
  }

  if (payload.method === 'frame_summon')
    return provider.connection.send({ jsonrpc: '2.0', id: 1, method, params })

  const id = provider.nextId++
  pending[id] = { tabId: sender?.tab?.id || tab.id, payloadId: payload.id, method, params }

  const load = {
    ...payload,
    jsonrpc: '2.0',
    id,
    __frameOrigin: getOrigin(tab, sender),
    __extensionConnecting: payload.__extensionConnecting
  }

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

const unsubscribeTab = (tabId) => {
  Object.keys(pending).forEach((id) => {
    if (pending[id].tabId === tabId) delete pending[id]
  })
  Object.keys(subs).forEach((sub) => {
    if (subs[sub].tabId === tabId) {
      provider.send({ jsonrpc: '2.0', id: 1, method: 'eth_unsubscribe', params: [sub] })
      delete subs[sub]
    }
  })
}

function sendEvent(event, args = [], tabSelector = {}) {
  chrome.tabs.query(tabSelector, (tabs) => {
    tabs.forEach((tab) => {
      chrome.tabs.sendMessage(tab.id, { type: 'eth:event', event, args })
    })
  })
}

chrome.tabs.onRemoved.addListener((tabId, _removed) => unsubscribeTab(tabId))
chrome.tabs.onUpdated.addListener((tabId, changeInfo, _tab) => {
  if (changeInfo.url) unsubscribeTab(tabId)
})
chrome.tabs.onActivated.addListener(({ tabId }) => {
  activeTab = tabId
  chrome.tabs.sendMessage(tabId, { type: 'embedded:action', action: { type: 'getChainId' } })
})

initProvider()
