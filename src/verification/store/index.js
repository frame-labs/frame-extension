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
  rightPanel: {},
  users: {},
  theme: themes(), // Fill default theme
  inventory: {
    selected: ''
  }
}

// Grab persisted state from local storage
const persist = JSON.parse(window.localStorage.getItem('__frameLayer__') || '{}')

const store = Restore.create({...initialState, ...persist}, actions)

store.observer(() => {
  window.localStorage.setItem('__frameLayer__', JSON.stringify(store()))
})

export default store