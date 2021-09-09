import React from 'react'
import Restore from 'react-restore'
import styled, { keyframes, ThemeProvider } from 'styled-components'

import store from '../../store'

import LeftPanel from './LeftPanel'
import RightPanel from './RightPanel'

import { cardShow } from './style'

const PopWrap = styled.div`
  position: absolute;
  top: 0px;
  left: 0px;
  bottom: 0px;
  right: 0px;
  pointer-events: auto;
  cursor: pointer;
`

const Pop = styled.div`
  position: absolute;
  top: 0px;
  left: 0px;
  width: 440px;
  height: 300px;
  border-radius: 10px;
  z-index: 20000;
  font-family: sans-serif;
  animation: ${cardShow} 400ms linear both;
  overscroll-behavior: contain;
  color: ${props => props.theme.top0};
  background: ${props => props.theme.base0};

`

const resetLayer = () => store.setLayerPop({ position: { x: 0 , y: 0 }, active: false, user: {} })

document.addEventListener('scroll', () => {
  if (store('layerPop.active')) resetLayer()
})

// const defaultTheme = {
//   moon: 'rgba(245, 110, 110, 1)',
//   bad: 'rgb(249, 24, 128)', // 'rgba(235, 90, 140, 1)'
//   good: 'rgb(0, 186, 124)', // 'rgb(0, 175, 145)'
//   moonOver: 'rgba(60, 20, 20, 1)',
//   badOver: 'rgb(100, 0, 0)',
//   goodOver: 'rgb(0, 86, 24)',
//   base0: 'rgb(40, 40, 50)', // Darkest Base
//   base1: 'rgb(50, 50, 60)',
//   base2: 'rgb(60, 60, 70)',
//   base3: 'rgb(70, 70, 80)',
//   base4: 'rgb(80, 80, 90)', // Lightest Base
//   top0: 'rgb(255, 255, 255)', // Lightest Top
//   top1: 'rgb(245, 245, 255)',
//   top2: 'rgb(235, 235, 255)',
//   top3: 'rgb(225, 225, 255)',
//   top4: 'rgb(215, 215, 255)' // Darkest Top
// }


class Layer extends React.Component {
  constructor () {
    super()
    this.state = {}
  }
  resetLayer () {
    const { created } = store('layerPop')
    if (Date.now() - created > 500) resetLayer()
  }
  render () {
    const { active, position, ensName, created } = this.store('layerPop')
    const user = this.store('users', ensName)
    const theme = this.store('theme')
    if (active) {
      return (
        <ThemeProvider theme={theme}>
          <PopWrap onMouseOver={(e) => this.resetLayer()}>
            <Pop
              onMouseDown={(e) => e.stopPropagation()} 
              onMouseOver={(e) => e.stopPropagation()} 
              style={{
                left: `${position.x - 65}px`, 
                top: `${position.y - 5}px`,
                pointerEvents: 'auto'
              }}
            >
              <LeftPanel />
              <RightPanel />
            </Pop>
          </PopWrap>
        </ThemeProvider>
      )
    } else {
      return null
    }
  }
}

export default Restore.connect(Layer, store)
