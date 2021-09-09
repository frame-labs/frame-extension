import React from 'react'
import Restore from 'react-restore'
import styled, { keyframes, ThemeProvider } from 'styled-components'

import InventoryItem from './InventoryItem'

const InventoryWrap = styled.div`
  border-radius: 8px;
  // background: ${props => props.theme.base2};
  margin: 0px 5px 5px 5px;
`

const InventoryHeader = styled.div`
  font-size: 10px;
  margin: 16px 4px 4px 4px;
  text-align: center;
  width; 100%;
  text-transform: uppercase;
  font-weight: 600;
  letter-spacing: 1px;
  // background: ${props => props.theme.base2};
`

const PopCollectionsWrapper = styled.div`
  text-align: center;
  // padding: 10px 0px 40px 10px;
  display: flex;
  flex-wrap: wrap;
  margin-top: 3px;
  border-radius: 10px;
`

class Inventory extends React.Component {
  constructor (...args) {
    super(...args)
    this.state = {
      hovered: false
    }
  }
  render () {
    const { ensName } = this.store('layerPop')
    const user = this.store('users', ensName)
    const selected = this.store('inventory.selected')

    if (selected) console.log(user.inventory[selected])

    return (
      <InventoryWrap>
        {!selected ? (
          <>
            <InventoryHeader>
              Inventory
            </InventoryHeader>
            <PopCollectionsWrapper>
              {Object.keys(user.inventory).sort((key1, key2) => {
                const c1 = user.inventory[key1]
                const c2 = user.inventory[key2]
                if (c1.meta.img && c2.meta.img) return 0
                if (c1.meta.img && !c2.meta.img) return -1
                if (!c1.meta.img && c2.meta.img) return 1
              }).map(key => {
                return <InventoryItem key={key} collection={key} />
              })}
            </PopCollectionsWrapper>
          </>
        ) : (
          <>
            <InventoryHeader>
              <div onClick={() => this.store.setCurrentCollection()}>back</div>
              {user.inventory[selected].meta.name}
            </InventoryHeader>
            <PopCollectionsWrapper>
              {Object.keys(user.inventory[selected].assets).map(key => {
                return <InventoryItem key={key} collection={selected} asset={key} />
              })}
            </PopCollectionsWrapper>
          </>
        )}
      </InventoryWrap>
    )
  }
}

export default Restore.connect(Inventory)