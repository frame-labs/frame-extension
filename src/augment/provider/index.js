import { EventEmitter } from 'events'
import ethProvider from 'eth-provider'

async function waitUntil(numTimes, check) {
  return new Promise((resolve) => {
    if (check() || !numTimes) return resolve()

    setTimeout(() => {
      resolve(waitUntil(numTimes - 1, check))
    }, 500)
  })
}

export default function (wrappedProvider) {
  const mainnetProvider = ethProvider('infura', { infuraId: '786ade30f36244469480aa5c2bf0743b' })
  const request = wrappedProvider.request
  const provider = new EventEmitter()

  let currentChain = 0

  const onMainnet = () => currentChain === 1

  provider.request = async ({ method, params }) => {
    if ((provider.connected && !wrappedProvider.connected) || (!onMainnet() && method === 'eth_call')) {
      // use the fallback provider when not connected and for all contract calls (which need to use mainnet ENS)
      return mainnetProvider.request({ method, params })
    }

    return request({ method, params })
  }

  provider.connected = false

  waitUntil(10, () => !wrappedProvider.connection.inSetup).then(() => {
    // check if wrapped provider is connected
    if (!wrappedProvider.connected) {
      provider.connected = true
      provider.emit('connect')
    }
  })

  wrappedProvider.on('connect', async () => {
    provider.connected = true
    wrappedProvider.on('chainChanged', (chain) => {
      currentChain = parseInt(chain)
    })

    wrappedProvider.request({ method: 'eth_chainId' }).then((chain) => (currentChain = parseInt(chain)))

    provider.emit('connect')
  })

  wrappedProvider.on('close', (data) => provider.emit('close', data))

  return provider
}
