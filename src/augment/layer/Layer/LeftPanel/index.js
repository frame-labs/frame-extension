import React from 'react'
import Restore from 'react-restore'
import styled, { keyframes, ThemeProvider } from 'styled-components'

import Inventory from './Inventory'
import User from './User'

const PopLeft = styled.div`
  position: absolute;
  top: 0px;
  right: 190px;
  bottom: 0px;
  left: 0px;
  z-index: 300;
  overflow: hidden;
  border-radius: 10px;
`

class LeftPanel extends React.Component {
  constructor (...args) {
    super(...args)
    this.state = {}
  }
  render () {
    return (
      <PopLeft>
        <User />
        <Inventory />
      </PopLeft>
    )
  }
}

export default Restore.connect(LeftPanel)