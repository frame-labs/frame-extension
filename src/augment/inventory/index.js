import store from '../store'
import Pylon from '@framelabs/pylon-client'

const pylon = new Pylon('wss://data.pylon.link')

const addressSub = []
const idMap = {}

pylon.on('inventories', inventories => {
  // Map and type media
  inventories.forEach(inv => {
    const address = inv.id
    const inventory = inv.data.inventory

    Object.keys(inventory).forEach(collection => {
      const { meta, items } = inventory[collection]

      meta.priority = meta.img ? 1 : 0

      const img = meta.img ? meta.img : items[Object.keys(items).filter(k => items[k].img).sort((a, b) => {
        if (items[a].tokenId < items[b].tokenId) return -1
        if (items[a].tokenId > items[b].tokenId) return 1
        return 0
      })[0]]?.img

      meta.img = { src: img || '' }
      meta.img.type = meta.img.src.endsWith('.mp4') || meta.img.src.endsWith('.mov') ? 'video' : 'img'
  
      Object.keys(items).forEach(asset => {
        const { img, animation, thumbnail } = items[asset]
  
        const media = convertAssetToMedia(items[asset])
  
        items[asset] = {
          ...items[asset],
          ...media
        }
  
        items[asset].img = { src: animation || img || '' }
        items[asset].img.type = items[asset].img.src.endsWith('.mp4') || items[asset].img.src.endsWith('.mov') ? 'video' : 'img'
        items[asset].thumbnail = { src: thumbnail || animation || img || ''}
        items[asset].thumbnail.type = items[asset].thumbnail.src.endsWith('.mp4') || items[asset].thumbnail.src.endsWith('.mov') ? 'video' : 'img'
      })
    })

    const userId = idMap[address]

    store.setUserInventory(userId, inventory)

    const avatarNft = store('users', userId, 'avatarNft')

    if (avatarNft) {
      const { avatarAddress, avatarTokenId } = avatarNft
      Object.keys(inventory).forEach(collection => {
        const { items } = inventory[collection]
        Object.keys(items).forEach(asset => {
          const a = inventory[collection].items[asset]
          const { contract, tokenId } = a
          if (
            contract.address.toLowerCase() === avatarAddress.toLowerCase() &&
            tokenId.toLowerCase() === avatarTokenId.toLowerCase()
          ) {
            store.setUserAvatar(userId, {img: a.img})
          }
        })
      })
    }
  })
})


function getMediaType (src) {
  return ['.mp4', '.mov'].some(suffix => src.endsWith(suffix)) ? 'video' : 'img'
}

function convertAssetToMedia (asset) {
  const { img, animation, thumbnail } = asset

  const image = { src: animation || img || '' }
  image.type = getMediaType(image.src)

  const thumb = { src: thumbnail || animation || img || ''}
  thumb.type = getMediaType(thumb.src)

  return {
    img: image,
    thumbnail: thumb
  }
}

function addUser (userId, address) {
  address = address.toLowerCase()
  if (addressSub.indexOf(address) === -1) addressSub.push(address)
  idMap[address] = userId
  pylon.inventories(addressSub)
}

export { addUser }
