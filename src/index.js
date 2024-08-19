/* globals chrome */
const ethProvider = require('eth-provider')

const subTypes = [
  'chainChanged',
  'chainsChanged',
  'accountsChanged',
  'assetsChanged',
  'networkChanged',
  'message'
]

// extension state
let provider
let settingsPanel, activeTabId

const subs = {}
const pending = {}

const frameState = {
  connected: false,
  availableChains: [],
  currentChain: ''
}

// helper functions
const originFromUrl = (url) => {
  if (!url) return ''
  const path = url.split('/')
  return `${path[0]}//${path[2]}`
}
const getOrigin = (sender = {}) => originFromUrl(sender.url)

const subType = (pendingPayload) => {
  try {
    const type = pendingPayload.params[0]
    return subTypes.includes(type) ? type : 'unknown'
  } catch (e) {
    return 'unknown'
  }
}

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

function updateSettingsPanel () {
  if (settingsPanel) {
    settingsPanel.postMessage(frameState)
  }
}

function setConnected (connected) {
  console.debug(`Setting connected to ${connected}`)

  frameState.connected = connected
  updateSettingsPanel()
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

function setIcon (path) {
  chrome.action.setIcon({ path })
}

function setPopup (popup) {
  chrome.action.setPopup({ popup })
}

async function fetchAvailableChains () {
  try {
    const chains = await provider.request({ method: 'wallet_getEthereumChains' })
    setChains(chains)
  } catch (e) {
    console.error('Error fetching chains', e)
    setChains([])
  }
}

async function sendEventToTab (tabId, event, args) {
  try {
    return await chrome.tabs.sendMessage(tabId, { type: 'eth:event', event, args })
  } catch (e) {
    console.error(`Error sending event "${event}"`, e)
  }
}

async function sendEvent(event, args = [], selector = {}) {
  const tabs = await chrome.tabs.query(selector)

  tabs
    .filter((tab) => !!tab.url)
    .forEach((tab) => sendEventToTab(tab.id, event, args))
}

function initProvider() {
  console.log('Initializing provider connection to Frame')

  provider = ethProvider('ws://127.0.0.1:1248?identity=frame-extension')

  provider.on('connect', async () => {
    console.log('Connected to Frame')

    setConnected(true)
    fetchAvailableChains()

    setIcon('icons/icon96good.png')
    sendEvent('connect')
  })

  provider.on('disconnect', () => {
    setConnected(false)

    setIcon('icons/icon96moon.png')
    sendEvent('close')
  })

  provider.on('chainsChanged', (chains = []) => {
    if (chains[0] && typeof chains[0] === 'object') {
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

function destroyProvider () {
  if (provider) {
    provider.close()
    provider = null
  }
}

function addStateListeners() {
  function onPortDisconnected(port) {
    settingsPanel = null
    port.onDisconnect.removeListener(onPortDisconnected)
  }

  function setMediaBlob (blobUrl, location, message) {
    window.__setMediaBlob__(blobUrl, location, message)
  }

  chrome.runtime.onMessage.addListener(async (extensionPayload, sender) => {
    const { tab, ...payload } = extensionPayload
    const { method, params } = payload

    console.debug('Message received from tab', { tab, payload })

    if (payload.method === 'embedded_action_res') {
      const [action, res] = params
      if (action.type === 'getChainId' && res.chainId) return setCurrentChain(res.chainId)
    } else if (payload.method === 'media_blob') {
      const location = payload.location

      try {
        const res = await fetch(payload.src)
        const blob = await res.blob()
        const blobURL = URL.createObjectURL(blob)

        chrome.scripting.executeScript({
          target: { tabId: sender.tab.id },
          func: setMediaBlob,
          args: [blobURL, location]
        })
      } catch (e) {
        chrome.scripting.executeScript({
          target: { tabId: sender.tab.id },
          func: setMediaBlob,
          args: ['', location, e.message]
        })
      }
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

  chrome.runtime.onConnect.addListener((port) => {
    port.onDisconnect.addListener(onPortDisconnected)

    if (port.name === 'frame_connect') {
      settingsPanel = port
      updateSettingsPanel()
    }
  })

  chrome.idle.onStateChanged.addListener((state) => {
    if (state === 'active') {
      destroyProvider()
      initProvider()
    }
  })
}

async function addTabListeners () {
  // Query for all existing tabs and store their origins
  const tabs = await chrome.tabs.query({})

// Create an object to store the last known origin for each tab
  const tabOrigins = Object.fromEntries(tabs.map(tab => [tab.id, originFromUrl(tab.url)]))

  chrome.tabs.onRemoved.addListener((tabId) => {
    delete tabOrigins[tabId]
    unsubscribeTab(tabId)
  })

  chrome.tabs.onUpdated.addListener((tabId, changeInfo) => {
    if (changeInfo.url) {
      const origin = originFromUrl(changeInfo.url)
      const tabOrigin = tabOrigins[tabId]
      if (tabOrigin !== origin) {
        tabOrigins[tabId] = origin
        unsubscribeTab(tabId)
      }
    }
  })

  chrome.tabs.onActivated.addListener(async ({ tabId }) => {
    activeTabId = tabId

    const tab = await chrome.tabs.get(tabId)
    const tabOrigin = getOrigin(tab.url)
    if (tabOrigin.startsWith('http') || tabOrigin.startsWith('file')) {
      chrome.tabs.sendMessage(tabId, { type: 'embedded:action', action: { type: 'getChainId' } })
    }
  })
}

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
      }
    }
  })
}

setIcon('icons/icon96moon.png')
setPopup('settings.html')

addStateListeners()
addTabListeners()
setupClientStatusAlarm()
initProvider()
