export const setLayerPop = (u, pop) => {
  u('layerPop', () => pop)
}

export const setHover = (u, hover) => {
  u('hover', () => hover)
}

export const setRightPanelCollection = (u, collection) => {
  u('rightPanel', (rp = {}) => {
    rp.currentCollection = collection
    return rp
  })
}

export const setRightPanelAsset = (u, asset) => {
  u('rightPanel', (rp = {}) => {
    rp.currentAsset = asset
    return rp
  })
}

export const clearRightPanel = (u) => {
  u('rightPanel', () => ({}))
}

export const setUser = (u, name, user) => {
  u('users', name, () => {
    Object.keys(user.inventory).forEach(c => {
      const collection = user.inventory[c]
      collection.meta.priority = collection.meta.img ? 1 : 0
      collection.meta.img = collection.meta.img ? collection.meta.img : collection.assets[Object.keys(collection.assets).filter((k) => {
        return collection.assets[k].img
      }).sort((a, b) => {
        if (collection.assets[a].tokenId < collection.assets[b].tokenId) return -1
        if (collection.assets[a].tokenId > collection.assets[b].tokenId) return 1
        return 0
      })[0]]?.img
    })
    return user
  })
}

export const setTheme = (u, theme) => {
  u('theme', () => theme)
}

export const setCurrentCollection = (u, collection) => {
  u('inventory.selectedCollection', () => collection)
}

export const setCurrentAsset = (u, asset) => {
  u('inventory.selectedAsset', () => asset)
}