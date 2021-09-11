import React from 'react'
import Restore from 'react-restore'
import styled, { keyframes, ThemeProvider } from 'styled-components'

import InventoryItem from './InventoryItem'

import { float, shake } from '../../style'

const InventoryWrap = styled.div`
  border-radius: 6px;
  background: ${props => props.theme.base1};
  margin: 5px;
`

const InventoryHeader = styled.div`
  position: relative;
  font-size: 10px;
  padding-top: 2px;
  text-align: center;
  width; 100%;
  text-transform: uppercase;
  font-weight: 600;
  letter-spacing: 1px;
  // background: ${props => props.theme.base2};
  position: realative;
  height: 24px;
  display: flex;
  justify-content: center;
  align-items: center;
`

const InventoryHeaderBack = styled.div`
  position: absolute;
  left: 10px;
  top: 7px;
  bottom: 0px;
  width: 26px;
  height: 14px;
  border-radius: 7px;
  background: ${props => props.theme.top2};
  color: ${props => props.theme.base0};
  cursor: pointer;

  svg {
    position: relative;
    width: 12px;
    top: 0px;
  }

  &:hover {
    background: ${props => props.theme.top0};
    animation: 5s ${float} ease-in-out infinite alternate;
    box-shadow: 0px 3px 5px 0px ${props => props.theme.baseShadow};
  }

  &:active {
    background: ${props => props.theme.top0};
    animation: ${shake} 2s ease-in-out infinite;
    box-shadow: 0px 1px 2px 0px ${props => props.theme.baseShadow};
  }
`

const PopCollectionsWrapper = styled.div`
  text-align: center;
  display: flex;
  flex-wrap: wrap;
  align-content: flex-start;
  border-radius: 7px;
  padding: 0px 5px 5px 5px;
  min-height: 154px;
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
    const selectedCollection = this.store('inventory.selectedCollection')

    // if (selectedCollection) console.log(user.inventory[selectedCollection])

    return (
      <InventoryWrap>
        {!selectedCollection ? (
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
              <InventoryHeaderBack
                onClick={() => {
                  this.store.setCurrentCollection()
                  this.store.setCurrentAsset()
                  this.store.clearRightPanel()
                }}
              >
                <svg viewBox="0 0 448 512">
                  <path fill="currentColor" d="M134.059 296H436c6.627 0 12-5.373 12-12v-56c0-6.627-5.373-12-12-12H134.059v-46.059c0-21.382-25.851-32.09-40.971-16.971L7.029 239.029c-9.373 9.373-9.373 24.569 0 33.941l86.059 86.059c15.119 15.119 40.971 4.411 40.971-16.971V296z" />
                </svg>
              </InventoryHeaderBack>
              {user.inventory[selectedCollection].meta.name === 'ENS: Ethereum Name Service' ? 'Ethereum Name Service' : user.inventory[selectedCollection].meta.name}
            </InventoryHeader>
            <PopCollectionsWrapper>
              {Object.keys(user.inventory[selectedCollection].assets).map(key => {
                return <InventoryItem key={key} collection={selectedCollection} asset={key} />
              })}
            </PopCollectionsWrapper>
          </>
        )}
      </InventoryWrap>
    )
  }
}

export default Restore.connect(Inventory)