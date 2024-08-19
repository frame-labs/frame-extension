import EventEmitter from 'events'
import EthereumProvider from 'ethereum-provider'

function setProvider() {
  const existingProvider = Object.getOwnPropertyDescriptor(window, 'ethereum')

  if (existingProvider?.configurable) {
    Object.defineProperty(window, 'ethereum', {
      value: provider,
      writable: true,
      configurable: true,
      enumerable: true
    })
  } else {
    window.ethereum = provider
  }
}

function shimWeb3(provider, appearAsMetaMask) {
  let loggedCurrentProvider = false

  if (!window.web3) {
    const SHIM_IDENTIFIER = appearAsMetaMask ? '__isMetaMaskShim__' : '__isFrameShim__'

    const shim = { currentProvider: provider }
    Object.defineProperty(shim, SHIM_IDENTIFIER, {
      value: true,
      enumerable: true,
      configurable: false,
      writable: false
    })

    const web3Shim = new Proxy(shim, {
      get: (target, property, ...args) => {
        if (property === 'currentProvider' && !loggedCurrentProvider) {
          loggedCurrentProvider = true
          console.warn(
            'You are accessing the Frame window.web3.currentProvider shim. This property is deprecated; use window.ethereum instead.'
          )
        } else if (property !== 'currentProvider' && property !== SHIM_IDENTIFIER) {
          console.error(
            `You are requesting the "${property}" property of window.web3 which no longer supported; use window.ethereum instead.`
          )
        }
        return Reflect.get(target, property, ...args)
      },
      set: (...args) => {
        console.warn(
          'You are accessing the Frame window.web3 shim. This object is deprecated; use window.ethereum instead.'
        )
        return Reflect.set(...args)
      }
    })

    Object.defineProperty(window, 'web3', {
      value: web3Shim,
      enumerable: false,
      configurable: true,
      writable: true
    })
  }
}

class ExtensionProvider extends EthereumProvider {
  // override the send method in order to add a flag that identifies messages
  // as "connection messages", meaning Frame won't track an origin that sends
  // these requests
  doSend(method, params, targetChain, waitForConnection) {
    if (!waitForConnection && (method === 'eth_chainId' || method === 'net_version')) {
      const payload = { jsonrpc: '2.0', id: this.nextId++, method, params, __extensionConnecting: true }
      return new Promise((resolve, reject) => {
        this.promises[payload.id] = { resolve, reject, method }
        this.connection.send(payload)
      })
    }

    return super.doSend(method, params, targetChain, waitForConnection)
  }
}

class Connection extends EventEmitter {
  constructor() {
    super()

    this.handleMessage = this.handleMessage.bind(this)

    window.addEventListener('message', this.handleMessage)

    setTimeout(() => this.emit('connect'), 0)
  }

  handleMessage (event) {
    if (event && event.source === window && event.data) {
      const { type } = event.data

      if (type === 'eth:payload') {
        this.emit('payload', event.data.payload)
      }

      if (type === 'eth:event') {
        this.emit(event.data.event, ...event.data.args)
      }
    }
  }

  send(payload) {
    window.postMessage({ type: 'eth:send', payload }, window.location.origin)
  }

  close () {
    window.removeEventListener('message', this.handleMessage)
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
      isUnlocked: () => new Promise((resolve) => resolve(true))
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

setProvider()

shimWeb3(window.ethereum, mmAppear)

const embedded = {
  getChainId: async () => ({ chainId: await window.ethereum.doSend('eth_chainId', [], undefined, false) })
}

document.addEventListener('readystatechange', (e) => {
  if (document.readyState === 'interactive') {
    setProvider()
  }
})

window.addEventListener('message', async (event) => {
  if (
    event &&
    event.source === window &&
    event.data &&
    event.data.type === 'embedded:action' &&
    window.self === window.top
  ) {
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

const info = {
  uuid: 'd7acc008-6411-5486-bb2d-0c0cfcddbb92',
  name: 'Frame',
  icon: 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMDcuNSIgaGVpZ2h0PSIzMDYiIHZpZXdCb3g9IjAgMCAzMDcuNSAzMDYiPgogIDxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9IiMyODI3MmEiPjwvcmVjdD4KICA8cGF0aCBmaWxsPScjMDBkMmJlJyB0cmFuc2Zvcm09InRyYW5zbGF0ZSg3NywgNzYuNSkiIGQ9Ik0xNDUuMSw3NS42VjE3LjZjMC01LjEtNC4yLTkuMy05LjMtOS4zaC01OC4xYy0uNiwwLTEuMS0uMi0xLjYtLjZsLTctN2MtLjQtLjQtMS0uNy0xLjYtLjdIOS4zQzQuMiwwLDAsNC4xLDAsOS4zaDB2NThjMCwuNi4yLDEuMS42LDEuNmw3LDdjLjQuNC43LDEsLjcsMS42djU4YzAsNS4xLDQuMiw5LjMsOS4zLDkuM2g1OC4yYy42LDAsMS4xLjIsMS42LjZsNyw3Yy40LjQsMSwuNiwxLjYuNmg1OC4yYzUuMSwwLDkuMy00LjEsOS4zLTkuM2gwdi01OGMwLS42LS4yLTEuMS0uNi0xLjZsLTctN2MtLjUtLjQtLjgtLjktLjgtMS41Wk0xMDUuNiwxMDYuNmgtNTcuN2MtLjcsMC0xLjMtLjYtMS4zLTEuM3YtNTcuNmMwLS43LjYtMS4zLDEuMy0xLjNoNTcuN2MuNywwLDEuMy42LDEuMywxLjN2NTcuNmMuMS43LS41LDEuMy0xLjMsMS4zWiIvPgo8L3N2Zz4K',
  rdns: 'sh.frame'
}

window.addEventListener('eip6963:requestProvider', () => {
  try {
    window.dispatchEvent(
      new CustomEvent('eip6963:announceProvider', {
        detail: Object.freeze({ info, provider })
      })
    )
  } catch (err) {
    console.error("Frame could not dispatch 'eip6963:announceProvider' event:", err)
  }
})
