import React from 'react'
import Restore from 'react-restore'
import ReactDOM from 'react-dom'
import styled, { keyframes } from 'styled-components'

import store from '../store'
import colors from '../colors'

const resetLayer = () => store.setLayerPop({ position: { x: 0 , y: 0 }, active: false, ensRecord: {} })

document.addEventListener('scroll', () => {
  if (store('layerPop.active')) resetLayer()
})

// const fadeIn = keyframes`
//   0% { 
//     opacity: 0; 
//   }
//   100% {
//     opacity: 1; 
//   }
// `

const cardShow = keyframes`
  0% { 
    opacity: 0; 
  }
  15.82% { 
    opacity: 0; 
    transform: matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, -9.026, 0, 0, 1); 
  }
  21.02% { 
    transform: matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, -19.292, 0, 0, 1); 
  }
  35.34% {
    transform: matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, -3.681, 0, 0, 1);
  }
  49.55% {
    opacity: 1;
    transform: matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 2.594, 0, 0, 1); 
  }
  78.18% {
    transform: matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, -0.018, 0, 0, 1); 
  }
  100% {
    transform: matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);
  }
`

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
  left:0px;
  width: 440px;
  height: 300px;
  border-radius: 8px;
  z-index: 20000;
  font-family: sans-serif;
  animation: ${cardShow} 400ms linear both;
  overscroll-behavior: contain;
`
const PopLeft = styled.div`
  position: absolute;
  top: 0;
  right: 190px;
  bottom: 0;
  left: 0;
  // background blue
  border-radius: 8px;
  overflow: hidden;
`

const PopRight = styled.div`
  position: absolute;
  top: 0;
  right: 0px;
  bottom: 0;
  width: 185px;
  background: blue;
  border-radius: 8px;
  overflow: hidden;
  animation: ${cardShow} 400ms linear both;
  overscroll-behavior: contain;
`

const PopInset = styled.div`
  position: absolute;
  top: 0;
  right: -15px;
  bottom: 0;
  left: 0;
  padding-right: 15px;
  padding-top: 30px;
  padding-bottom: 30px;
  overflow-y: scroll;
  overflow-x: hidden;
  overscroll-behavior: contain;
`

const PopAvatar = styled.div`
  width: 100%;
  height: 100px;
  position: relative;
`
const PopAvatarImg = styled.div`
  position: absolute;
  top: 5px;
  left: 5px;
  bottom: 5px;
  width: 90px;
  height: 90px;
  border-radius: 8px;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 8px;
  }
`
const PopAvatarMeta = styled.div`
  position: absolute;
  top: 5px;
  right: 0;
  bottom: 5px;
  width: 150px;
`
const PopAvatarMetaName = styled.div`
  font-size: 12px;
  font-weight: bold;

`
const PopAvatarMetaId = styled.div`
`
const PopAvatarMetaVerified = styled.div`
`

const NFTPFP = styled.div`
  width: 100%;
  height: 30px;
`

const PopName = styled.div`
  position: absolute;
  left: 0px;
  right: 0px;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  // background: rgba(0, 0, 0, 0.2);
  z-index: 20000;
  font-weight: 400;
  pointer-events: none;
`

const VerifiedLabel = styled.div`
  position: absolute;
  right: 5px;
  text-align: center;
  font-size: 8px;
  font-weight: 600;
  text-transform: uppercase;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 4px;
  padding: 3px;
`

const PopCollections = styled.div`

`

const PopCollectionsHeader = styled.div`
  text-align: center;
  padding: 10px;
  width; 100%;
  // background: blue;
`

const PopCollectionsWrapper = styled.div`
  text-align: center;
  padding: 10px 0px 40px 10px;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`

const PopCollection = styled.div`
  width: 40px;
  height: 40px;
  padding: 5px 5px 0px 0px;
  img {
    width: 40px;
    height: 40px;
    object-fit: cover;
    border-radius: 8px;
  }
`


// add nft collection name and token id when there is one
// when hovering 

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
    const currentStyle = this.store('currentStyle')
    const { active, position, ensName, created } = this.store('layerPop')
    const ensRecord = this.store('ensRecords', ensName)
    if (active) {
      return (
        <PopWrap
          onMouseOver={(e) => {
            this.resetLayer()
          }}
        >
          <Pop
            onMouseDown={(e) => e.stopPropagation()} 
            onMouseOver={(e) => e.stopPropagation()} 
            style={{
              left: `${position.x - 65}px`, 
              top: `${position.y - 5}px`,
              pointerEvents: 'auto'
            }}
          >
            <PopLeft style={{
              background: currentStyle.backgroundColor,
              color: currentStyle.color,
              boxShadow: currentStyle.boxShadow
            }}>
              <PopName
                style={{
                  background: currentStyle.backgroundColor,
                  color: currentStyle.color,
                  borderBottom: `1px solid ${currentStyle.color}`
                }}
              >
                {ensRecord.name}
                {ensRecord.verified.name ? (
                  <VerifiedLabel style={{ backgroundColor: colors.good, color: colors.goodOver }}>
                    Verified
                  </VerifiedLabel>    
                ) : (
                  <VerifiedLabel style={{ backgroundColor: colors.bad, color: colors.badOver }}>
                    Unverified
                  </VerifiedLabel>
                )}
              </PopName>
              <PopInset>
                <PopAvatar>
                  <PopAvatarImg>
                    <img src={ensRecord.avatar} />
                  </PopAvatarImg>
                  <PopAvatarMeta>
                    <PopAvatarMetaName>TOKEN</PopAvatarMetaName>
                    <PopAvatarMetaId>#192034</PopAvatarMetaId>
                    <PopAvatarMetaVerified>
                      {ensRecord.verified.avatar ? (
                        <VerifiedLabel style={{ backgroundColor: colors.good}}>
                          Verified
                        </VerifiedLabel>    
                      ) : (
                        <VerifiedLabel style={{ backgroundColor: colors.bad}}>
                          Not verified
                        </VerifiedLabel>
                      )}
                    </PopAvatarMetaVerified>
                  </PopAvatarMeta>
                </PopAvatar>
               
                <PopCollections>
                  <PopCollectionsHeader>
                    Inventory
                  </PopCollectionsHeader>
                  <PopCollectionsWrapper>
                    {Object.keys(ensRecord.inventory).map(key => {
                      const collection = ensRecord.inventory[key]
                      if (collection.meta.img) {
                        return (
                          <PopCollection 
                            onMouseEnter={() => {
                              this.setState({ rightPanel: collection.meta.name })
                            }}
                            onMouseLeave={() => {
                              this.setState({ rightPanel: false })
                            }}
                          >
                            <img src={collection.meta.img} style={{ backgroundColor: currentStyle.color }} />
                          </PopCollection>
                        )
                      } else {
                        return (
                          null
                        )
                      }
                    })}
                  </PopCollectionsWrapper>
                </PopCollections>
              </PopInset>
            </PopLeft>
            {this.state.rightPanel ? (
              <PopRight 
                key={this.state.rightPanel}
                style={{
                  background: currentStyle.backgroundColor,
                  color: currentStyle.color,
                  boxShadow: currentStyle.boxShadow
                }}
              >
                {this.state.rightPanel}
              </PopRight>
            ) : null}
          </Pop>
        </PopWrap>
      )
    } else {
      return null
    }
  }
}

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
const ConnectedLayer = Restore.connect(Layer, store)

ReactDOM.render(<ConnectedLayer />, layer)