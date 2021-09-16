import React from 'react'
import Restore from 'react-restore'
import styled, { keyframes, ThemeProvider } from 'styled-components'

import { float, shake } from '../../../style'
import { Video, Image } from '../../../media'

const PopCollection = styled.div`
  width: 48px;
  height: 48px;
  border-radius: 3px;
  padding: 5px 4px 4px 5px;
  // transform: translate3d(180, 180, 180);
  cursor: pointer;
  word-break: break-word;
  user-select: none;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;

  img {
    width: 48px;
    height: 48px;
    object-fit: cover;
    border-radius: 3px;
    background: ${props => props.theme.base0};
  }

  video {
    width: 48px;
    height: 48px;
    object-fit: cover;
    border-radius: 3px;
    background: ${props => props.theme.base0};
  }

  &:hover {
    transform: scale(1.2);
    z-index: 2000;
    img, div {
      animation: 5s ${float} ease-in-out infinite alternate;
      box-shadow: 0px 8px 6px -2px ${props => props.theme.baseShadow};
    }
  }

  &:active {
    // transform: scale(1);
    z-index: 2000;
    img, div {
      animation: ${shake} 2s ease-in-out infinite;
      box-shadow: 0px 1px 1px -2px ${props => props.theme.baseShadow};
    }
  }
`

const ItemSelected = styled.div`
  position: absolute;
  top: 2px;
  right: 1px; 
  bottom: 1px;
  left: 2px;
  border: 2px solid ${props => props.theme.top0};
  border-radius: 6px;
  z-index: 20000;
`

const TextImg = styled.div`
  width: 48px;
  height: 48px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 3px;
  font-size: 8px;
  padding: 5px;
  box-sizing: border-box;
  background: ${props => props.theme.base0};
  position: relative;
`

class InventoryItem extends React.Component {
  constructor (...args) {
    super(...args)
    this.state = {
      hovered: false
    }
  }
  render () {
    const { userId } = this.store('layerPop')
    const user = this.store('users', userId)

    if (this.props.asset) {
      const asset = user.inventory[this.props.collection].assets[this.props.asset]
      const img = asset.thumbnail
      const select = this.store('select')

      return (
        <PopCollection 
          onClick={() => {
            if (select?.asset === this.props.asset) {
              this.store.setSelect({ 
                type: 'collection', 
                collection: this.props.collection 
              })
            } else {
              this.store.setSelect({ 
                type: 'asset', 
                asset: this.props.asset,
                collection: this.props.collection 
              })
            }
          }}
          onMouseMove = {() => {
            this.store.setHover({ 
              type: 'asset', 
              asset:this.props.asset,
              collection: this.props.collection 
            })
          }}
          onMouseEnter={() => {
            this.store.setHover({ 
              type: 'asset', 
              asset:this.props.asset,
              collection: this.props.collection 
            })
          }}
          onMouseLeave={() => {
            this.store.setHover(false)
          }}
        >
          {select?.asset === this.props.asset ? <ItemSelected /> : null }
          {img?.src && img.type === 'video' ? (
            <Video src={img.src} soundOff={true} />
          ) : img?.src && img.type === 'img' ? (
            <Image src={img.src} />
          ) : <TextImg>{asset.name}</TextImg>}
        </PopCollection>
      )
    } else if (this.props.collection) {
      const collection = user.inventory[this.props.collection]
      const img = collection.meta.img
      const select = this.store('select')
      return (
        <PopCollection 
          onClick={() => {
            this.store.setSelect({ 
              type: 'collection', 
              collection: this.props.collection 
            })
          }}
          onMouseEnter={() => {
            this.store.setHover({ 
              type: 'collection', 
              collection: this.props.collection 
            })
          }}
          onMouseLeave={() => {
            this.store.setHover(false)
          }}
        >
          {select?.collection === this.props.collection ? <ItemSelected /> : null }
          {img?.src && img.type === 'video' ? (
            <Video src={img.src} soundOff={true} />
          ) : img?.src && img.type === 'img' ? (
            <Image src={img.src} />
          ) : <TextImg>{collection.meta.name}</TextImg>}
        </PopCollection>
       )
    } else {
      return null
    }
  }
}

export default Restore.connect(InventoryItem)