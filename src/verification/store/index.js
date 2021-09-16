import Restore from 'react-restore'
import * as actions from './actions'

import themes from '../themes'

const initialState = {
  layerPop: {
    active: false,
    position: {
      x: 0,
      y: 0
    },
    name: ''
  },
  users: {},
  theme: themes(), // Fill default theme
  inventory: {
    selected: ''
  },
  blobMap: {},
  scrollBarWidth: 0
}

// Grab persisted state from local storage
window.localStorage.removeItem('__frameLayer__') 
const persist = {} // JSON.parse(window.localStorage.getItem('__frameLayer__') || '{}')

const store = Restore.create({...initialState, ...persist}, actions)

// store.observer(() => {
//   window.localStorage.setItem('__frameLayer__', JSON.stringify(store()))
// })

window.__setMediaBlob__ = (blobURL, location, error) => {
  if (error) return store.setBlob(blobURL, location, error)
  fetch(blobURL)
    .then(res => res.blob())
    .then(blob => {
      const localBlob = URL.createObjectURL(blob)
      store.setBlob(localBlob, location)
    })
}

const getScrollBarWidth = () => {
  const inner = document.createElement('p')
  inner.style.width = '100%'
  inner.style.height = '200px'
  const outer = document.createElement('div')
  outer.style.position = 'absolute'
  outer.style.top = '0px'
  outer.style.left = '0px'
  outer.style.visibility = 'hidden'
  outer.style.width = '200px'
  outer.style.height = '150px'
  outer.style.overflow = 'hidden'
  outer.appendChild(inner)
  document.body.appendChild(outer)
  var w1 = inner.offsetWidth
  outer.style.overflow = 'scroll'
  var w2 = inner.offsetWidth
  if (w1 == w2) w2 = outer.clientWidth
  document.body.removeChild(outer)
  store.setScrollBarWidth(w1 - w2)
}

getScrollBarWidth()

// Only in dev env
// const liquidId = 'liquiddensity-eth'
// const liquidUser = require('./dev/liquiddensity-eth.json')
// store.setUser(liquidId, liquidUser)
// const brantlyId = 'brantly-eth'
// const brantlyUser = require('./dev/brantly-eth.json')
// store.setUser(brantlyId, brantlyUser)
// const validatorId = 'validator-eth'
// const validatorUser = require('./dev/validator-eth.json')
// store.setUser(validatorId, validatorUser)

// const position = { x: 100, y: 50}
// const userId = liquidId

// store.setLayerPop({ position, active: true, userId, created: Date.now() })  

export default store