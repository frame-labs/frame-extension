import React from 'react'
import ReactDOM from 'react-dom'

import store from '../store'
import Layer from './Layer'

const layer = document.createElement('div')
layer.className = '__frameLayer__'
document.body.appendChild(layer)
layer.style.cssText = `
  position: fixed;
  top: 0px;
  right: 0px;
  bottom: 0px;
  left: 0px;
  pointer-events: none;
  z-index: 2000;
  overscroll-behavior: none;
`
ReactDOM.render(<Layer  />, layer)

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
