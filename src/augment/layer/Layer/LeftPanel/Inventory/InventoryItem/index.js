import React from 'react'
import Restore from 'react-restore'

import { Video, Image } from '../../../media'

import {
  PopCollection,
  ItemSelected,
  TextImg
} from './styled'

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