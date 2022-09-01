const EventEmitter = require('events')
const EthereumProvider = require('ethereum-provider')

class ExtensionProvider extends EthereumProvider {
  // override the send method in order to add a flag that identifies messages
  // as "connection messages", meaning Frame won't track an origin that sends
  // these requests
  _send (method, params, targetChain, waitForConnection) {
    if (!waitForConnection && (method === 'eth_chainId' || method === 'net_version')) {
      const payload = { jsonrpc: '2.0', id: this.nextId++, method, params, __extensionConnecting: true }
      
      return new Promise((resolve, reject) => {
        this.promises[payload.id] = { resolve, reject, method }
        this.connection.send(payload)
      })
    }

    return super._send(method, params, targetChain, waitForConnection)
  }
}

class Connection extends EventEmitter {
  constructor () {
    super()
    window.addEventListener('message', event => {
      if (event && event.source === window && event.data && event.data.type === 'eth:payload') {
        this.emit('payload', event.data.payload)
      }
    })
    setTimeout(() => this.emit('connect'), 0)
  }

  send (payload) {
    window.postMessage({ type: 'eth:send', payload }, window.location.origin)
  }
}

let mmAppear = window.localStorage.getItem('__frameAppearAsMM__')

try {
  mmAppear = JSON.parse(mmAppear)
} catch (e) {
  mmAppear = false
}

let provider

if (mmAppear) {
  class MetaMaskProvider extends ExtensionProvider {}

  try {
    provider = new MetaMaskProvider(new Connection())
    provider.isMetaMask = true
    provider._metamask = {
      isUnlocked: () => true
    }
    provider.setMaxListeners(0)
  } catch (e) {
    console.error('Frame Error:', e)
  }
} else {
  class FrameProvider extends ExtensionProvider {}

  try {
    provider = new FrameProvider(new Connection())
    provider.isFrame = true
    provider.setMaxListeners(0)
  } catch (e) {
    console.error('Frame Error:', e)
  }
}

Object.defineProperty(window, 'ethereum', {
  value: provider,
  enumerable: true,
  writable: false,
  configurable: false
})

const embedded = {
  getChainId: async () => ({ chainId: await window.ethereum._send('eth_chainId', [], undefined, false) })
}

window.addEventListener('message', async event => {
  if (event && event.source === window && event.data && event.data.type === 'embedded:action') {
    if (event.data.action) {
      const action = event.data.action
      if (embedded[action.type]) {
        const res = await embedded[action.type](action)
        const payload = { method: 'embedded_action_res', params: [action, res] }
        window.postMessage({ type: 'eth:send', payload }, window.location.origin)
      } else {
        console.warn(`Could not find embedded action ${action.type}`)
      }
    }
  }
})
