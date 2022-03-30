export const setLayerPop = (u, pop) => {
  u('layerPop', () => pop)
}

export const setHover = (u, hover) => {
  u('hover', () => hover)
}

export const setSelect = (u, select) => {
  u('select', () => select)
}

export const setUser = (u, userId, user) => {
  u('users', userId, () => user)
}

export const setUserInventory = (u, userId, inventory) => {
  if (!userId || !inventory) return
  u('users', userId, user => {
    user.inventory = inventory
    return user
  })
}

export const setTheme = (u, theme) => {
  u('theme', () => theme)
}

export const setBlob = (u, blob, location, error) => {
  if (error) {
    console.error(error)
  } else {
    u('blobMap', location, () => blob)
  }
}

export const setScrollBarWidth = (u, width) => {
  u('scrollBarWidth', () => width)
}
