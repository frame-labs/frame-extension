const { FetchWrapper } = require('use-nft')
const ethProvider = require('eth-provider')
const { ethers } = require('ethers')

const CRYPTOKITTIES = "0x06012c8cf97BEaD5deAe237070F9587f8E7A266d"
const CRYPTOPUNKS = "0xb47e3cd837ddf8e4c57f05d70ab865de6e193bbb"
const CRYPTOPUNKS_IMAGES = "0x16F5A35647D6F03D5D3da7b35409D65ba03aF3B2"
const CRYPTOVOXELS = "0x79986aF15539de2db9A5086382daEdA917A9CF0C"
const DECENTRALAND_ESTATE = "0x959e104E1a4dB6317fA58F8295F586e1A978c297"
const DECENTRALAND_PARCEL = "0xf87e31492faf9a91b02ee0deaad50d51d56d5d4d"

function capitalize (s = '') {
  return s.split(' ').map(sub => (sub[0] || '').toUpperCase() + sub.slice(1).toLowerCase()).join(' ')
}

function contract (address, eth, abi) {
  const provider = new ethers.providers.Web3Provider(eth)
  return new ethers.Contract(address, abi, provider)
}

function erc721Contract (address, eth) {
  return contract(address, eth, [
    'function name() view returns (string name)'
  ])
}

function cryptoPunksContract (eth) {
  return contract(CRYPTOPUNKS, eth, [
    'function punkIndexToAddress(uint256 name) view returns (address name)',
    'function name() view returns (string name)'
  ])
}

async function getNft (address, tokenId) {
  const eth = ethProvider()
  const fetcher = new FetchWrapper(['ethereum', { ethereum: ethProvider() }])
  const nft = await fetcher.fetchNft(address, tokenId)

  let collectionName

  // custom resolve logic for non-standard NFT contracts
  if (address.toLowerCase() === CRYPTOPUNKS) {
    const contract = cryptoPunksContract(eth)

    nft.owner = await contract.punkIndexToAddress(tokenId)
    collectionName = await contract.name()
  } else {
    const contract = erc721Contract(address, eth)

    collectionName = await contract.name()
  }

  try {
    eth.close()
  } catch (e) {
    console.error('error closing Ethereum connection', e)
  }

  return {
    ...nft,
    collection: capitalize(collectionName),
    owner: (nft.owner || '').toLowerCase()
  }
}

module.exports = { getNft }
