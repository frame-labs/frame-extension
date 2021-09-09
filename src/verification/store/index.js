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
  users: {},
  theme: {
    moon: 'rgba(245, 110, 110, 1)',
    bad: 'rgb(249, 24, 128)', // 'rgba(235, 90, 140, 1)'
    good: 'rgb(0, 186, 124)', // 'rgb(0, 175, 145)'
    moonOver: 'rgba(60, 20, 20, 1)',
    badOver: 'rgb(100, 0, 0)',
    goodOver: 'rgb(0, 86, 24)',
    base0: 'rgb(40, 40, 50)', // Darkest Base
    base1: 'rgb(50, 50, 60)',
    base2: 'rgb(60, 60, 70)',
    base3: 'rgb(70, 70, 80)',
    base4: 'rgb(80, 80, 90)', // Lightest Base
    top0: 'rgb(255, 255, 255)', // Lightest Top
    top1: 'rgb(245, 245, 255)',
    top2: 'rgb(235, 235, 255)',
    top3: 'rgb(225, 225, 255)',
    top4: 'rgb(215, 215, 255)' // Darkest Top
  },
  inventory: {
    selected: ''
  }
}

// Grab persisted state from local storage

const store = Restore.create(initialState, actions)

export default store