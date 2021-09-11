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

const Loading = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  text-transform: uppercase;
  font-size: 12px;
  letter-spacing: 2px;
  margin-left: 2px;
`

const resetLayer = () => store.setLayerPop({ position: { x: 0 , y: 0 }, active: false, user: {} })

document.addEventListener('scroll', () => {
  if (store('layerPop.active')) resetLayer()
})

class Layer extends React.Component {
  constructor (...args) {
    super(...args)
    this.state = {}

    // store.observer(() => {
    //   const { active } = store('layerPop')
    //   if (active) {
    //     document.body.style.overflow = 'hidden'
    //   } else {
    //     document.body.style.overflow = 'unset'
    //   }
    // })

  }
  resetLayer () {
    const { created } = store('layerPop')
    if (Date.now() - created > 500) resetLayer()
  }
  block (e) {
    e.preventDefault()
    e.stopPropagation()
  }
  render () {
    const { active, position, ensName, created } = this.store('layerPop')
    const user = this.store('users', ensName)
    const theme = this.store('theme')
    if (active) {
      if (user) {
        return (
          <ThemeProvider theme={theme}>
            <PopWrap onClick={(e) => this.resetLayer()}>
              <Pop
                onMouseDown={this.block} 
                onMouseOver={this.block} 
                onMouseMove={this.block}
                onScroll={this.block}
                onClick={this.block} 
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
                <Loading>
                  {'loading'}
                </Loading>
              </Pop>
            </PopWrap>
          </ThemeProvider>
        )
      }
    } else {
      return null
    }
  }
}

export default Restore.connect(Layer, store)
