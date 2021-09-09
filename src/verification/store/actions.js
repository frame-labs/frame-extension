export const setLayerPop = (u, pop) => {
  u('layerPop', () => pop)
}

export const setRightPanel = (u, panel) => {
  u('rightPanel', () => panel)
}

export const setUser = (u, name, user) => {
  u('users', name, () => user)
}