import React from 'react'
import Restore from 'react-restore'
import styled, { keyframes, ThemeProvider } from 'styled-components'

const PopCollection = styled.div`
  width: 36px;
  height: 36px;
  padding: 10px;
  border-radius: 6px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 2px;
  background: ${props => props.theme.base2};

  img {
    width: 34px;
    height: 34px;
    object-fit: cover;
    border-radius: 3px;
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
  render () {
    const { ensName } = this.store('layerPop')
    const user = this.store('users', ensName)

    if (this.props.asset) {
      const asset = user.inventory[this.props.collection].assets[this.props.asset]
      console.log('asset in ', asset)
      return (
        <PopCollection 
          style={this.state.hovered ? { background: 'red'} : {}}
          onClick={() => {
            this.setCollection(this.props.collection)
          }}
          onMouseEnter={() => {
            this.setState({ hovered: true })
            // this.popCollectionHover = setTimeout(() => {
            //   this.store.setRightPanel(collection)
            // }, 100)
          }}
          onMouseLeave={() => {
            this.setState({ hovered: false })
            clearTimeout(this.popCollectionHover)
            // this.store.setRightPanel(false)
          }}
        >
          {asset.img ? <img src={asset.img} /> : asset.name}
        </PopCollection>
      )
    } else if (this.props.collection) {
      const collection = user.inventory[this.props.collection]
      return (
        <PopCollection 
        style={this.state.hovered ? { background: 'red'} : {}}
        onClick={() => {
          this.setCollection(this.props.collection)
        }}
        onMouseEnter={() => {
          this.setState({ hovered: true })
          this.popCollectionHover = setTimeout(() => {
            this.store.setRightPanel(collection)
          }, 100)
        }}
        onMouseLeave={() => {
          this.setState({ hovered: false })
          clearTimeout(this.popCollectionHover)
          this.store.setRightPanel(false)
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