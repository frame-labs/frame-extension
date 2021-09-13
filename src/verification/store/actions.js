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

export const setUser = (u, userId, user) => {
  u('users', userId, () => user)
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

export const setBlob = (u, blob, location) => {
  u('blobMap', location, () => blob)
}
