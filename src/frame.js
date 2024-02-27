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

    window.addEventListener('message', (event) => {
      if (event && event.source === window && event.data) {
        const { type } = event.data

        if (type === 'eth:payload') {
          this.emit('payload', event.data.payload)
        }

        if (type === 'eth:event') {
          this.emit(event.data.event, ...event.data.args)
        }
      }
    })

    setTimeout(() => this.emit('connect'), 0)
  }

  send(payload) {
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

function announceProvider() {
  const info = {
      uuid: "12b45e47-4823-4380-bd37-2e84197f4d62",
      name: "Frame",
      icon: "data:image/svg+xml,%3Csvg width='256' height='256' viewBox='0 0 256 256' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cg clip-path='url(%23clip0_1_18)'%3E%3Crect width='256' height='256' fill='%23C77590'/%3E%3Cpath fill-rule='evenodd' clip-rule='evenodd' d='M54 119.5V144.5L61.5 152L62 198.5C62 198.5 61 205.5 67 211.5C73 217.5 80.5 218.5 80.5 218.5H127L136 226.5H180.5C180.5 226.5 190.7 226 195.5 220C200.3 214 200.5 206 200.5 206L201 170L200.5 131L193 123L160.5 88.5L98 83L71.5 99.5L54 119.5ZM107.5 121C105.5 121 104 122.5 101 125.5C98 128.5 96.5 132 96.5 132L95.5 140L96.5 151L106.5 155.5L153 154.5L163 145L158.5 131C158.5 131 157 127 154.5 124.5C152 122 148 121 148 121C148 121 109.5 121 107.5 121Z' fill='%23181818' fill-opacity='0.16'/%3E%3Cpath fill-rule='evenodd' clip-rule='evenodd' d='M201 174V183C201 185.333 199.6 191.1 194 195.5C188.4 199.9 182 201.333 179.5 201.5H136L128 193.5H82.5C78.5 192.833 69.7 190.2 66.5 185C62.5 178.5 62 177 62 171V169V127L54.5 119.5V114.5V68L84.5 71.5L161.5 68L178 70L184 118L194 137L201 144V174ZM96.5 144V107.5C97.3 99.9 104.5 96 108 95H146.5C154.1 95 158.333 103 159.5 107V141.5L157.5 149.5L149 154.5H108L99 151L96.5 144Z' fill='%23E6D5FA'/%3E%3Cpath fill-rule='evenodd' clip-rule='evenodd' d='M54 114.5L61.5 121.5V168.5C62.6667 175 68.1 188.1 80.5 188.5C92.9 188.9 117.333 188.667 128 188.5L136 196.5H183.5C189.333 194.5 201 187.6 201 176V130.5L193.5 122.5V77.5C192.833 70.1667 187.6 55.6 172 56C156.4 56.4 136.167 56.1667 128 56L120.5 48H74C66 48 54 55.8 54 67V114.5ZM96.5 102V141.5C96.5 142.833 97.3 146.3 100.5 149.5C103.7 152.7 107.833 153.833 109.5 154H146.5C148.667 153.333 153.4 151.5 155 149.5C156.6 147.5 158 144.333 158.5 143C158.667 131.5 158.9 107.1 158.5 101.5C158.08 95.6248 151.5 91 147.5 90.5C143.5 90 116.519 90.5 110 90.5C104 90.5 96.5 98 96.5 102Z' fill='url(%23paint0_linear_1_18)'/%3E%3C/g%3E%3Cdefs%3E%3ClinearGradient id='paint0_linear_1_18' x1='63' y1='55.5' x2='193' y2='192' gradientUnits='userSpaceOnUse'%3E%3Cstop stop-color='white'/%3E%3Cstop offset='1' stop-color='%23F4EEFD'/%3E%3C/linearGradient%3E%3CclipPath id='clip0_1_18'%3E%3Crect width='256' height='256' fill='white'/%3E%3C/clipPath%3E%3C/defs%3E%3C/svg%3E%0A",
      rdns: "sh.frame",
  };
  if (provider?.isFrame) {
      window.dispatchEvent(
          new CustomEvent("eip6963:announceProvider", {
              detail: Object.freeze({ info, provider }),
          }),
      );
  }
}

window.addEventListener("eip6963:requestProvider", (event) => {
  announceProvider();
});

announceProvider();