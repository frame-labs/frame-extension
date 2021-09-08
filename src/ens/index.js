import ethProvider from 'eth-provider'
import recordUpdate from './update'
import ensResolver from './resolver'
import hasher from '@ensdomains/content-hash'
import { utils, ethers } from 'ethers'

const registrarAbi = new utils.Interface(require('./abi/registrar.json'))
const registrarContract = '0x00000000000C2E074eC69A0dFb2997BA6C7d2e1e'

const parseField = (field, data) => {
  const [setField, ...subKey] = field.split('.')
  const setValue = subKey.length > 0 ? { [subKey.join('.')]: data } : data

  return { [setField]: setValue }
}

const providerConnected = provider => {
  return new Promise((resolve, reject) => {
    const checkAccess = async () => {
      try {
        const connect = await provider.request({ method: 'eth_chainId', id: 1 })
        resolve(connect)
      } catch (e) {
        reject(e)
      }
    }

    if (provider.connected) return checkAccess()

    const timeout = setTimeout(() => reject(new Error('Ethereum provider is not connected')), 10 * 1000)

    provider.on('connect', () => {
      clearTimeout(timeout)
      checkAccess()
    })
  })
}

const ens = (eth = ethProvider()) => {
  const web3Provider = new ethers.providers.Web3Provider(eth, 'any')
  const registrar = new ethers.Contract(registrarContract, registrarAbi, web3Provider)

  const withResolver = async (domain, provider, fn) => {
    await providerConnected(eth)

    return ensResolver(domain, registrar, provider).then(fn)
  }

  const getField = async (resolver, key) => {
    const [field, ...subFields] = key.split('.')
    const subField = subFields.join('.')


    if (field === 'text') {
      return resolver.getText(subField)
    } else if (field === 'addresses') {
      return resolver.getAddress(subField)
    } else if (field === 'contentHash') {
      return resolver.getContentHash()
    }

    return Promise.resolve('')
  }

  async function getContentPath (resolver) {
    return getField(resolver, 'contentHash').then(hash => {
      if (hash === '0x' || ethers.BigNumber.from(hash).isZero()) return ''

      const decoded = hasher.decode(hash)
      const codec = hasher.getCodec(hash)

      if (codec === 'ipfs-ns') {
        return `/ipfs/${decoded}`
      } else if (codec === 'ipns-ns') {
        return `/ipns/${decoded}`
      }

      console.log(`content hash uses unsupported encoding ${codec}`)

      return decoded
    })
  }

  async function update (resolver, fields) {
    const record = await resolve(resolver)
    const calls = recordUpdate(record, fields)

    if (calls.length === 0) {
      console.warn(`attempted to update ${resolver.name} but no updates performed!`)
      return
    }

    console.log(`updating ${resolver.name} with`, calls)

    const tx = await resolver.multicall(calls).then(resp => resp.hash)

    console.log(`updated ${resolver.name}, tx: ${tx}`)

    return tx
  }

  async function resolve (resolver) {
    const content = await getContentPath(resolver)
    const manifest = await getField(resolver, 'text.manifest')
    const avatar = await getField(resolver, 'text.avatar')
    const twitter = await getField(resolver, 'text.com.twitter')

    return {
      name: resolver.name.toLowerCase(),
      chain: await eth.request({ method: 'eth_chainId' }),
      content,
      text: { manifest },
      avatar, 
      twitter
    }
  }

  return {
    setField: async (domain, field, data) =>
      withResolver(domain, web3Provider.getSigner(), resolver => update(resolver, parseField(field, data))),
    getField: async (domain, field) =>
      withResolver(domain, web3Provider, resolver => getField(resolver, field)),
    update: async (domain, options) =>
      withResolver(domain, web3Provider.getSigner(), resolver => update(resolver, options)),
    resolve: async domain =>
      withResolver(domain, web3Provider, resolve),
    getAddress0: async name => await web3Provider.resolveName(name),
    lookupAddress: async address => {
      await providerConnected(eth)
      return await web3Provider.lookupAddress(address)
    }
  }
}

export default ens
