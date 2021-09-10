import React from 'react'
import Restore from 'react-restore'
import styled, { keyframes, ThemeProvider } from 'styled-components'

import { cardShow } from '../style'

const PopRight = styled.div`
  position: absolute;
  top: 0;
  right: 0px;
  bottom: 0;
  width: 190px;
  z-index: 200;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  animation: ${cardShow} 400ms linear both;
  overscroll-behavior: contain;
  color: ${props => props.theme.top0};
`

const PopRightLogo = styled(PopRight)`
  svg {
    height: 80px;
    fill: ${props => props.theme.base2};
    opacity: 0.2;
  }
`

const CollectionSummary = styled.div`
`

const CollectionSummaryTitle = styled.div`
  width: 100%;
  font-size: 12px;
  text-align: center;
  font-weight: 600;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  max-width: 100%;
  box-sizing: border-box;
  padding: 0px 8px 5px 8px;
`

const CollectionSummaryImage = styled.div`
  width: 112px;
  height: 112px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: 600;
  border-radius: 56px;
  overflow: hidden;
  background: ${props => props.theme.base1};
  text-align: center;
  margin: 16px;

  img {
    width: 112px;
    height: 112px;
    object-fit: cover;
    border-radius: 2px;
  }

  span {
    padding: 16px;
  }
`

const CollectionItemCount = styled.div`
  width: 100%;
  height: 48px;
  font-size: 9px;
  letter-spacing: 1px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-weight: 600;
  text-transform: uppercase;
  position: relative;
`

const CollectionItemCountNumber = styled.div`
  font-size: 20px;
  font-weight: 400;
  text-transform: uppercase;
  margin: 5px 0px 3px 0px;
  height: 44px;
  border-radius: 8px;
  padding: 0px 8px;
  min-width 60px;
  display: flex;
  justify-content: center;
  align-items: center;
  background: ${props => props.theme.base1};
`

const AssetSummayImage = styled.div`
  width: 160px;
  height: 160px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: 600;
  border-radius: 8px;
  overflow: hidden;
  background: ${props => props.theme.base1};
  text-align: center;

  img {
    width: 160px;
    height: 160px;
    object-fit: cover;
    border-radius: 8px;
  }
`

class RightPanel extends React.Component {
  constructor (...args) {
    super(...args)
    this.state = {}
  }
  renderContent () {
    const { ensName } = this.store('layerPop')
    const user = this.store('users', ensName)
    const { currentCollection, currentAsset } = this.store('rightPanel')

    if (currentAsset) {
      const collectionName = user.inventory[currentCollection].meta.name
      const asset = user.inventory[currentCollection].assets[currentAsset]
      console.log('Asset', asset)

      return (
        <PopRight key={asset.name}>
          <AssetSummayImage>
            {asset.img ? <img src={asset.img} /> : asset.name}
          </AssetSummayImage>
          <CollectionSummaryTitle>
            {asset.name}
          </CollectionSummaryTitle>
          <CollectionItemCount>
            <CollectionItemCountNumber>
            {'#' + asset.tokenId}
            </CollectionItemCountNumber>
            <div>{collectionName}</div>
          </CollectionItemCount>
        </PopRight>
      )
    } else if (currentCollection) {
      const collection = user.inventory[currentCollection]
      const count = Object.keys(collection.assets).length || 0

      return (
        <PopRight key={collection.meta.name}>
          <CollectionSummaryTitle>
            {collection.meta.name === 'ENS: Ethereum Name Service' ? 'Ethereum Name Service' : collection.meta.name}
          </CollectionSummaryTitle>
          <CollectionSummaryImage>
            {collection.meta.img ? <img src={collection.meta.img} /> : <span>{collection.meta.name}</span> }
          </CollectionSummaryImage>
          <CollectionItemCount>
            <CollectionItemCountNumber>
              {count}
            </CollectionItemCountNumber>
            <div>{count === 1 ? 'item' : 'items'}</div>
          </CollectionItemCount>
        </PopRight>
      )
    } else {
      return null
    }

  }
  render () {
    return (
      <>
        <PopRightLogo key='logo'>
          <svg viewBox="0 0 245 247">
            <path d="M232,124V46.82A33.82,33.82,0,0,0,198.18,13H123L110,0H36.94A36.94,36.94,0,0,0,0,36.94V111l13,13v76.18A33.82,33.82,0,0,0,46.82,234H123l13,13h72.06A36.94,36.94,0,0,0,245,210.06V137Zm-58,29.41A22.6,22.6,0,0,1,151.41,176H93.59A22.6,22.6,0,0,1,71,153.41V93.59A22.6,22.6,0,0,1,93.59,71h57.82A22.6,22.6,0,0,1,174,93.59Z"/>
          </svg>
        </PopRightLogo>
        {this.renderContent()}
      </>
    )
  }
}

export default Restore.connect(RightPanel)