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
`
ReactDOM.render(<Layer  />, layer)

// Only in dev env
// const name = 'brantly.eth'
// const user = require('./dev/user.json')
// store.setUser(name, user)
// const position = { x: 100, y: 50}
// store.setLayerPop({ position, active: true, ensName: name, created: Date.now() })

