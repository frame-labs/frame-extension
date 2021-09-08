import Restore from 'react-restore'
import * as actions from './actions'
const initialState = {
  layerPop: {
    active: false,
    position: {
      x: 0,
      y: 0
    },
    name: ''
  },
  ensRecords: {},
  currentStyle: {
    backgroundColor: 'blue',
    color: 'red'
  }
}

// Grab persisted state from local storage

const store = Restore.create(initialState, actions)

export default store