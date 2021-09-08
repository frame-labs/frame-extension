export const setCurrentStyle = (u, style) => {
  u('currentStyle', () => style)
}

export const setLayerPop = (u, pop) => {
  u('layerPop', () => pop)
}

export const setENSRecord = (u, name, record) => {
  u('ensRecords', name, () => record)
}