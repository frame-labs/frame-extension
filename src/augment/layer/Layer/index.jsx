import React from 'react'
import Restore from 'react-restore'
import { ThemeProvider } from 'styled-components'

import store from '../../store'

import LeftPanel from './LeftPanel'
import RightPanel from './RightPanel'

import { PopWrap, Pop, Loading, LoadingSpinner } from './styled'

class Layer extends React.Component {
  constructor(...args) {
    super(...args)
    this.state = {}
  }
  componentDidMount() {
    document.addEventListener('scroll', () => {
      this.resetLayer()
    })
  }
  resetLayer() {
    const { active, created } = this.store('layerPop')
    if (active && Date.now() - created > 500) {
      this.store.setLayerPop({ position: { x: 0, y: 0 }, active: false, user: {} })
      this.store.setSelect(false)
      this.store.setHover(false)
    }
  }
  block(e) {
    e.preventDefault()
    e.stopPropagation()
  }
  render() {
    const { active, position, userId } = this.store('layerPop')
    const user = this.store('users', userId)
    const theme = this.store('theme')
    if (active) {
      if (user && !user.error) {
        return (
          <ThemeProvider theme={theme}>
            <PopWrap onClick={() => this.resetLayer()}>
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
            <PopWrap onClick={() => this.resetLayer()}>
              <Pop
                onMouseDown={(e) => e.stopPropagation()}
                onMouseOver={(e) => e.stopPropagation()}
                style={{
                  left: `${position.x - 65}px`,
                  top: `${position.y - 5}px`,
                  pointerEvents: 'auto'
                }}
              >
                {user?.error ? (
                  <Loading>
                    <div>{'could not resolve ens name'}</div>
                  </Loading>
                ) : (
                  <Loading>
                    <LoadingSpinner>
                      <svg viewBox='0 0 50 50'>
                        <circle cx='25' cy='25' r='20' fill='none' strokeWidth='5' />
                      </svg>
                    </LoadingSpinner>
                    <div>{'loading'}</div>
                  </Loading>
                )}
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
