const { EventEmitter } = require('events')
const ethProvider = require('eth-provider')

export default function (wrappedProvider) {
  const mainnetProvider = ethProvider('infura', { infuraId: '786ade30f36244469480aa5c2bf0743b' })
  const request = wrappedProvider.request
  const provider = new EventEmitter()

  let currentChain = 0

  const onMainnet = () => currentChain === 1

  provider.request = async ({ method, params }) => {
    if (!onMainnet() && method === 'eth_call') {
      return mainnetProvider.request({ method, params })
    }
    
    return request({ method, params })
  }

  provider.on = wrappedProvider.on
  provider.emit = wrappedProvider.emit
  provider.connected = false

  wrappedProvider.on('connect', () => {
    provider.connected = true
    wrappedProvider.on('chainChanged', chain => {
      currentChain = parseInt(chain)
    })

    provider.emit('connect')
  })
  
  return provider
}