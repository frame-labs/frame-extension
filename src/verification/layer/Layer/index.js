import React from 'react'
import Restore from 'react-restore'
import styled, { keyframes, ThemeProvider } from 'styled-components'

import store from '../../store'
import svg from '../../svg'

import LeftPanel from './LeftPanel'
import RightPanel from './RightPanel'

import { cardShow, dash, rotate } from './style'

const PopWrap = styled.div`
  position: fixed;
  top: 0px;
  left: 0px;
  bottom: 0px;
  right: 0px;
  pointer-events: auto;
`

const Pop = styled.div`
  position: fixed;
  top: 0px;
  left: 0px;
  width: 440px;
  height: 300px;
  border-radius: 10px;
  z-index: 20000;
  font-family: sans-serif;
  animation: ${cardShow} 400ms linear both;
  overscroll-behavior: contain;
  overflow: hidden;
  color: ${props => props.theme.top0};
  background: ${props => props.theme.base0};
  font-size: 15px;
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
  color: ${props => props.theme.top0};
  display: flex;
  flex-direction: column;
`

const LoadingSpinner = styled.div`
  position: relative;
  width: 50px;
  height: 50px;
  margin-bottom: 10px;
  svg {
    animation: ${rotate} 2s linear infinite;
    z-index: 2;
    position: absolute;
    top: 50%;
    left: 50%;
    margin: -25px 0 0 -25px;
    width: 50px;
    height: 50px;
    
    & circle {
      stroke: ${props => props.theme.top0};
      stroke-linecap: round;
      animation: ${dash} 1.5s ease-in-out infinite;
    }
  }
`

const resetLayer = () => {
  store.setLayerPop({ position: { x: 0 , y: 0 }, active: false, user: {} })
  store.setSelect(false)
  store.setHover(false)
}

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
    const { active, position, userId, created } = this.store('layerPop')
    const user = this.store('users', userId)
    const theme = this.store('theme')
    if (active) {
      if (user && !user.error) {
        return (
          <ThemeProvider theme={theme}>
            <PopWrap onClick={(e) => this.resetLayer()}>
              <Pop
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
            <PopWrap onClick={(e) => this.resetLayer()}>
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
                  <LoadingSpinner>
                      <svg viewBox='0 0 50 50'>
                        <circle cx='25' cy='25' r='20' fill='none' strokeWidth='5' />
                      </svg>
                  </LoadingSpinner>
                  <div>{'loading'}</div>
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
