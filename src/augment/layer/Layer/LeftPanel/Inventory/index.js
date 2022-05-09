import React from 'react'
import Restore from 'react-restore'

import InventoryItem from './InventoryItem'

import { 
  InventoryWrap,
  InventoryNone,
  InventoryHeader,
  InventoryHeaderBack,
  InventoryHeaderText,
  ItemWrap,
  ItemScroll,
  PopCollectionsWrapper
} from './styled'

class Inventory extends React.Component {
  constructor (...args) {
    super(...args)
    this.state = {
      hovered: false
    }
  }
  render () {
    const { userId } = this.store('layerPop')
    const user = this.store('users', userId) || {}
    const select = this.store('select')
    const collection = select?.collection

    let name = collection ? user?.inventory?.[collection]?.meta?.name : '' || ''
    if (name === 'ENS: Ethereum Name Service') name = 'Ethereum Name Service'
    if (name.length > 26) name = name.substr(0, 23) + '...' 
    const paddingRight = (50 - this.store('scrollBarWidth')) + 'px'
    return (
      <InventoryWrap>
        {!collection ? (
          <>
            <InventoryHeader>   
              Inventory
            </InventoryHeader>
            <ItemWrap>
              <ItemScroll style={{ paddingRight }}>
                <PopCollectionsWrapper>
                  {user.inventory ? Object.keys(user.inventory).sort((key1, key2) => {
                    const c1 = user.inventory[key1]
                    const c2 = user.inventory[key2]
                    if (c1.meta.priority === c2.meta.priority) return 0
                    if (c1.meta.priority > c2.meta.priority) return -1
                    if (c1.meta.priority < c2.meta.priority) return 1
                  }).map(key => {
                    return <InventoryItem key={key} collection={key} />
                  }): null}
                  {user.inventory ? Object.keys(user.inventory).length === 0 ? <InventoryNone><span>{'no items'}</span></InventoryNone> : null : <InventoryNone><span>{'loading'}</span></InventoryNone>}
                </PopCollectionsWrapper>
              </ItemScroll>
            </ItemWrap>
          </>
        ) : (
          <>
            <InventoryHeader>
              <InventoryHeaderBack
                onClick={() => {
                  this.store.setSelect(false)
                  this.store.setHover(false)
                }}
              >
                <svg viewBox="0 0 448 512">
                  <path fill="currentColor" d="M134.059 296H436c6.627 0 12-5.373 12-12v-56c0-6.627-5.373-12-12-12H134.059v-46.059c0-21.382-25.851-32.09-40.971-16.971L7.029 239.029c-9.373 9.373-9.373 24.569 0 33.941l86.059 86.059c15.119 15.119 40.971 4.411 40.971-16.971V296z" />
                </svg>
              </InventoryHeaderBack>
              <InventoryHeaderText>
                {name}
              </InventoryHeaderText>
            </InventoryHeader>
            <ItemWrap>
              <ItemScroll>
                <PopCollectionsWrapper>
                  {Object.keys(user.inventory[collection].items).map(key => {
                    return <InventoryItem key={key} collection={collection} asset={key} />
                  })}
                </PopCollectionsWrapper>
              </ItemScroll>
            </ItemWrap>
          </>
        )}
      </InventoryWrap>
    )
  }
}

export default Restore.connect(Inventory)