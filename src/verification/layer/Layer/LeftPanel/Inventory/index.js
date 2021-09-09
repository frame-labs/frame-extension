import React from 'react'
import Restore from 'react-restore'
import styled, { keyframes, ThemeProvider } from 'styled-components'


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

  // border-bottom: 1px solid ${props => props.theme.base0};
  // border-left: 1px solid ${props => props.theme.base0};
  img {
    width: 34px;
    height: 34px;
    object-fit: cover;
    border-radius: 3px;
  }
`

class Inventory extends React.Component {
  constructor (...args) {
    super(...args)
    this.state = {}
  }
  render () {
    const { ensName } = this.store('layerPop')
    const user = this.store('users', ensName)
    return (
      <InventoryWrap>
        <InventoryHeader>
          Inventory
        </InventoryHeader>
        <PopCollectionsWrapper>
          {Object.keys(user.inventory).map(key => {
            const collection = user.inventory[key]
            if (collection.meta.img) {
              return (
                <PopCollection 
                  onMouseEnter={() => {
                    this.popCollectionHover = setTimeout(() => {
                      this.store.setRightPanel(collection)
                    }, 100)  
                  }}
                  onMouseLeave={() => {
                    clearTimeout(this.popCollectionHover)
                    this.store.setRightPanel(false)
                  }}
                >
                  <img src={collection.meta.img} />
                </PopCollection>
              )
            } else {
              return (
                null
              )
            }
          })}
        </PopCollectionsWrapper>
      </InventoryWrap>
    )
  }
}

export default Restore.connect(Inventory)