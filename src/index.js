/* globals chrome */

const ethProvider = require('eth-provider')
let provider

const subs = {}
const pending = {}

const originFromUrl = (url) => {
  if (!url) return ''
  const path = url.split('/')
  return `${path[0]}//${path[2]}`
}
const getOrigin = (sender = {}) => originFromUrl(sender.url)

chrome.action.setPopup({ popup: 'settings.html' })
chrome.action.setIcon({ path: 'icons/icon96moon.png' })

const frameState = {
  connected: false,
  availableChains: [],
  currentChain: ''
}

function updateSettingsPanel () {
  if (settingsPanel) {
    settingsPanel.postMessage(frameState)
  }
}

function setChains(chains) {
  console.debug('Setting available chains', { chains })

  frameState.availableChains = chains
  updateSettingsPanel()
}

function setCurrentChain(chain) {
  console.debug(`Setting current chain to ${chain}`)

  frameState.currentChain = chain
  updateSettingsPanel()
}

function initProvider() {
  console.log('Initializing provider connection to Frame')

  provider = ethProvider('ws://127.0.0.1:1248?identity=frame-extension')

  provider.on('connect', () => {
    console.log('Connected to Frame')

    frameState.connected = true
    updateSettingsPanel()

    provider
      .request({ method: 'wallet_getEthereumChains' })
      .then(setChains)
      .catch(() => setChains([]))

    // change icon
    chrome.action.setIcon({ path: 'icons/icon96good.png' })

    sendEvent('connect')
  })

  provider.on('disconnect', () => {
    frameState.connected = false
    updateSettingsPanel()

    // change icon
    chrome.action.setIcon({ path: 'icons/icon96moon.png' })

    sendEvent('close')
  })

  provider.on('chainsChanged', (chains = []) => {
    if (chains[0] && chains[0] !== null && typeof chains[0] === 'object') {
      setChains(chains)
    }
  })

  provider.connection.on('payload', async (payload) => {
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
        if (pending[payload.id].method === 'eth_chainId' && pending[payload.id].tabId === activeTabId) {
          const payloadOrigin = pending[payload.id].origin
          const activeTab = await chrome.tabs.get(activeTabId)
          const activeTabOrigin = originFromUrl(activeTab.url)
          if (activeTabOrigin === payloadOrigin) {
            const chainId = payload.result
            if (chainId) setCurrentChain(chainId)
          }
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
      if (sub.type === 'chainChanged' && sub.tabId === activeTabId) {
        const chainId = payload.params?.result
        if (chainId) setCurrentChain(chainId)
      }
    }
  })
}

let settingsPanel, activeTabId

function portDisconnected(port) {
  settingsPanel = null
  port.onDisconnect.removeListener(portDisconnected)
}

chrome.runtime.onConnect.addListener((port) => {
  port.onDisconnect.addListener(portDisconnected)

  if (port.name === 'frame_connect') {
    settingsPanel = port
    updateSettingsPanel()
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

function setMediaBlob (blobUrl, location, message) {
  window.__setMediaBlob__(blobUrl, location, message)
}

chrome.runtime.onMessage.addListener(async (extensionPayload, sender, sendResponse) => {
  const { tab, ...payload } = extensionPayload
  const { method, params } = payload

  console.debug('Message received from runtime', { tab, payload })

  if (payload.method === 'embedded_action_res') {
    const [action, res] = params
    if (action.type === 'getChainId' && res.chainId) return setCurrentChain(res.chainId)
  } else if (payload.method === 'media_blob') {
    const location = payload.location
    fetch(payload.src)
      .then((res) => res.blob())
      .then((blob) => {
        const blobURL = URL.createObjectURL(blob)

        chrome.scripting.executeScript({
          target: { tabId: sender.tab.id },
          func: setMediaBlob,
          args: [blobURL, location]
        })
      })
      .catch((e) => {
        chrome.scripting.executeScript({
          target: { tabId: sender.tab.id },
          func: setMediaBlob,
          args: [blobURL, location, e.message]
        })
      })
  }

  if (payload.method === 'frame_summon')
    return provider.connection.send({ jsonrpc: '2.0', id: 1, method, params })

  const id = provider.nextId++
  const origin = getOrigin(tab || sender)
  if (!origin) return console.error('No origin found for sender')
  pending[id] = {
    tabId: sender?.tab?.id || tab.id,
    payloadId: payload.id,
    method,
    params,
    origin
  }

  const load = {
    ...payload,
    jsonrpc: '2.0',
    id,
    __frameOrigin: origin,
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

async function sendEvent(event, args = [], tabSelector = {}) {
  const tabs = await chrome.tabs.query(tabSelector)
  tabs.forEach((tab) => {
    chrome.tabs.sendMessage(tab.id, { type: 'eth:event', event, args })
  })
}

// Create an object to store the last known origin for each tab
const tabOrigins = {}

// Query for all existing tabs and store their origins
chrome.tabs.query({}, (tabs) => {
  for (let tab of tabs) tabOrigins[tab.id] = originFromUrl(tab.url)
})

chrome.tabs.onRemoved.addListener((tabId, removed) => {
  delete tabOrigins[tabId]
  unsubscribeTab(tabId)
})

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (changeInfo.url) {
    const origin = originFromUrl(changeInfo.url)
    const tabOrigin = tabOrigins[tabId]
    if (tabOrigin !== origin) {
      tabOrigins[tabId] = origin
      unsubscribeTab(tabId)
    }
  }
})

chrome.tabs.onActivated.addListener(({ tabId }) => {
  activeTabId = tabId
  chrome.tabs.sendMessage(tabId, { type: 'embedded:action', action: { type: 'getChainId' } })
})

const CLIENT_STATUS_ALARM_KEY = 'check-client-status'

async function setupClientStatusAlarm() {
  const alarm = await chrome.alarms.get(CLIENT_STATUS_ALARM_KEY)

  if (!alarm) {
    await chrome.alarms.create(CLIENT_STATUS_ALARM_KEY, { delayInMinutes: 0, periodInMinutes: 0.5 })
  }

  chrome.alarms.onAlarm.addListener((alarm) => {
    if (alarm.name === CLIENT_STATUS_ALARM_KEY) {
      if (provider && provider.isConnected()) {
        provider.request({ jsonrpc: '2.0', id: 1, method: 'web3_clientVersion' })
      } else {
        initProvider()
      }
    }
  })
}

initProvider()
setupClientStatusAlarm()
