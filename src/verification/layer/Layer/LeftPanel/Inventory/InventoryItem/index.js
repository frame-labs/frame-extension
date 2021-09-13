import React from 'react'
import Restore from 'react-restore'
import styled, { keyframes, ThemeProvider } from 'styled-components'

import { float, shake } from '../../../style'
import { Video, Image } from '../../../media'

const PopCollection = styled.div`
  width: 48px;
  height: 48px;
  border-radius: 3px;
  // display: flex;
  // justify-content: center;
  // align-items: center;
  padding: 5px 4px 4px 5px;
  // transform: translate3d(180, 180, 180);
  cursor: pointer;
  word-break: break-word;
  user-select: none;

  img {
    width: 48px;
    height: 48px;
    object-fit: cover;
    border-radius: 3px;
    background: ${props => props.theme.base2};
  }

  video {
    width: 48px;
    height: 48px;
    object-fit: cover;
    border-radius: 3px;
    background: ${props => props.theme.base2};
  }

  div {
    width: 48px;
    height: 48px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 3px;
    font-size: 8px;
    padding: 5px;
    box-sizing: border-box;
    background: ${props => props.theme.base2};
    position: relative;
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

class InventoryItem extends React.Component {
  constructor (...args) {
    super(...args)
    this.state = {
      hovered: false
    }
  }
  setCollection (collection) {
    this.store.setCurrentCollection(collection)
  }
  unsetCollection () {
    this.store.setCurrentCollection()
  }
  setAsset (asset) {
    this.store.setCurrentAsset(asset)
  }
  unsetAsset () {
    this.store.setCurrentAsset()
  }
  render () {
    const { userId } = this.store('layerPop')
    const user = this.store('users', userId)

    if (this.props.asset) {
      const asset = user.inventory[this.props.collection].assets[this.props.asset]
      const img = asset.thumbnail
      return (
        <PopCollection 
          onClick={() => {
            this.setAsset(this.props.asset)
            this.store.setRightPanelAsset(this.props.asset)
          }}
          onMouseMove = {() => {
            this.store.setRightPanelAsset(this.props.asset)
            // this.popCollectionHover = setTimeout(() => {
              
            // }, 100)
          }}
          onMouseEnter={() => {
            this.store.setRightPanelAsset(this.props.asset)
            // this.popCollectionHover = setTimeout(() => {
              
            // }, 100)
          }}
          onMouseLeave={() => {
            // clearTimeout(this.popCollectionHover)
            this.store.setRightPanelAsset(false)
          }}
        >
          {img.type === 'video' ? (
            <Video src={img.src} />
          ) : img.type === 'img' ? (
            <Image src={img.src} />
          ) : asset.name}
        </PopCollection>
      )
    } else if (this.props.collection) {
      const collection = user.inventory[this.props.collection]
      const img = collection.meta.img
      return (
        <PopCollection 
          onClick={() => {
            this.store.setCurrentCollection(this.props.collection)
            this.store.setRightPanelCollection(this.props.collection)
          }}
          onMouseEnter={() => {
            // this.setState({ hovered: true })
            this.store.setRightPanelCollection(this.props.collection)
            // this.popCollectionHover = setTimeout(() => {
              
            // }, 100)
          }}
          onMouseLeave={() => {
            // this.setState({ hovered: false })
            // clearTimeout(this.popCollectionHover)
            this.store.clearRightPanel()
          }}
        >
          {img.type === 'video' ? (
            <Video src={img.src} />
          ) : img.type === 'img' ? (
            <Image src={img.src} />
          ) : collection.meta.name}
        </PopCollection>
       )
    } else {
      return null
    }
  }
}

export default Restore.connect(InventoryItem)