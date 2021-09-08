import { utils, ethers } from 'ethers'
import { formatsByName } from '@ensdomains/address-encoder'

const abi = new utils.Interface(require('./abi/resolver.json'))

export default async (domain, registrar, provider) => {
  const node = utils.namehash(domain)

  const resolverAddress = await registrar.resolver(node)
  const resolverContract = new ethers.Contract(resolverAddress, abi, provider)

  const encodeFunction = (method, params) => abi.encodeFunctionData(method, [node, ...params])

  const encoders = {
    setAddr: ([coinName, address]) => {
      const symbol = coinName.toUpperCase()

      if (symbol === 'ETH') {
        return abi.encodeFunctionData('setAddr(bytes32,address)', [node, address])
      } else {
        const coin = formatsByName[symbol]
        const coinAddress = coin.decoder(address)

        return abi.encodeFunctionData('setAddr(bytes32,uint,bytes)', [node, coin.coinType, coinAddress])
      }
    }
  }

  const getContentHash = () => resolverContract.contenthash(node)
  const getText = key => resolverContract.text(node, key)
  const getAddress = key => resolverContract.addr(node, key)

  const multicall = async calls => {
    const encodedCalls = calls.map(call => {
      return (call.method in encoders)
        ? encoders[call.method](call.params)
        : encodeFunction(call.method, call.params)
    })

    return resolverContract.multicall(encodedCalls)
  }

  return { multicall, getContentHash, getText, getAddress, name: domain }
}
