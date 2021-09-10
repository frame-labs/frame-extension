import React from 'react'
import Restore from 'react-restore'
import styled, { keyframes, ThemeProvider } from 'styled-components'

const PopCollection = styled.div`
  width: 56px;
  height: 56px;
  // padding: 10px;
  border-radius: 6px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 2px;
  background: ${props => props.theme.base2};
  cursor: pointer;

  img {
    width: 56px;
    height: 56px;
    object-fit: cover;
    border-radius: 6px;
  }

  &:hover {
    background: ${props => props.theme.base3};
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
    const { ensName } = this.store('layerPop')
    const user = this.store('users', ensName)

    if (this.props.asset) {
      const asset = user.inventory[this.props.collection].assets[this.props.asset]
      console.log('asset in ', asset)
      return (
        <PopCollection 
          onClick={() => {
            this.setAsset(this.props.collection)
            this.store.setRightPanelAsset(this.props.asset)
          }}
          onMouseEnter={() => {
            this.popCollectionHover = setTimeout(() => {
              this.store.setRightPanelAsset(this.props.asset)
            }, 100)
          }}
          onMouseLeave={() => {
            clearTimeout(this.popCollectionHover)
            this.store.setRightPanelAsset(false)
          }}
        >
          {asset.img ? <img src={asset.img} /> : asset.name}
        </PopCollection>
      )
    } else if (this.props.collection) {
      const collection = user.inventory[this.props.collection]
      return (
        <PopCollection 
          onClick={() => {
            this.store.setCurrentCollection(this.props.collection)
            this.store.setRightPanelCollection(this.props.collection)
          }}
          onMouseEnter={() => {
            this.setState({ hovered: true })
            this.popCollectionHover = setTimeout(() => {
              this.store.setRightPanelCollection(this.props.collection)
            }, 100)
          }}
          onMouseLeave={() => {
            this.setState({ hovered: false })
            clearTimeout(this.popCollectionHover)
            this.store.clearRightPanel()
          }}
        >
          {collection.meta.img ? <img src={collection.meta.img} /> : collection.meta.name.substr(0,3)}
        </PopCollection>
       )
    } else {
      return null
    }
  }
}

export default Restore.connect(InventoryItem)