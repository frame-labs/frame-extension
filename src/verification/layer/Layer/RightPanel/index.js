import React from 'react'
import Restore from 'react-restore'
import styled, { keyframes, ThemeProvider } from 'styled-components'

import { cardShowl, float, shake } from '../style'

import svg from '../../../svg'

const PopRight = styled.div`
  position: absolute;
  top: 0;
  right: 0px;
  bottom: 0;
  width: 195px;
  z-index: 200;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  // animation: ${float} 200ms linear both;
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
  margin-top: 8px;
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
  margin: 8px;

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
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-weight: 600;
  position: relative;
`

const CollectionItemCountNumber = styled.div`
  font-size: 20px;
  font-weight: 400;
  text-transform: uppercase;
  height: 24px;
  border-radius: 12px;
  padding: 2px 8px 0px 8px;
  min-width 60px;
  display: flex;
  borx-sizing: border-box;
  justify-content: center;
  align-items: center;
  background: ${props => props.theme.good};
  color: ${props => props.theme.goodOver};
`

const CollectionItemCountLabel = styled.div`
  font-size: 10px;
  letter-spacing: 1px;
  text-transform: uppercase;
  margin-left: 1px;
`

const AssetSummayImage = styled.div`
  width: 185x;
  height: 185px;
  margin-top: 5px;
  // margin: 9px 11px 10px 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: 600;
  text-align: center;

  img {
    width: 185px;
    height: 185px;
    object-fit: contain;
    border-radius: 5px;
  }
`

const AssetSummayName = styled.div`
  font-size: 12px;
  height: 44px;
  padding-top: 2px;
  text-align: center;
  font-weight: 600;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  max-width: 100%;
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  align-items: center;
`

const AssetSummayCollection = styled.div`
  font-size: 9px;
  letter-spacing: 1px;
  text-transform: uppercase;
  padding-left: 1px;
  text-align: center;
  font-weight: 600;
`

const AssetLink = styled.div`
  width: 160px;
  height: 80px;
  display: flex;
  justify-content: center;
  align-items: center;
`

class RightPanel extends React.Component {
  constructor (...args) {
    super(...args)
    this.state = {}
  }
  renderDefault () {
    return (
      <PopRightLogo key='logo'>
        <svg viewBox="0 0 245 247">
          <path d="M232,124V46.82A33.82,33.82,0,0,0,198.18,13H123L110,0H36.94A36.94,36.94,0,0,0,0,36.94V111l13,13v76.18A33.82,33.82,0,0,0,46.82,234H123l13,13h72.06A36.94,36.94,0,0,0,245,210.06V137Zm-58,29.41A22.6,22.6,0,0,1,151.41,176H93.59A22.6,22.6,0,0,1,71,153.41V93.59A22.6,22.6,0,0,1,93.59,71h57.82A22.6,22.6,0,0,1,174,93.59Z"/>
        </svg>
      </PopRightLogo>
    )
  }
  renderContent () {
    const { ensName } = this.store('layerPop')
    const user = this.store('users', ensName)
    const { currentCollection, currentAsset } = this.store('rightPanel') // Currently hovered
    const { selectedCollection, selectedAsset } = this.store('inventory') // Currently selected

    // console.log('currentCollection', currentCollection)
    // console.log('selectedCollection', selectedCollection)

    // console.log('currentAsset', currentAsset)
    // console.log('selectedAsset', selectedAsset)

    // const { hoverNameVerification } = this.store('rightPanel') 
    // const { selectedNameVerification } = this.store('nav') 

    const collection = currentCollection || selectedCollection
    const asset = currentAsset || selectedAsset

    const hover = this.store('hover')
    const selected = false

    const theme = this.store('theme')

    if (hover) {
      if (hover.type === 'name') {
        return (
          <PopRight key='hover:name'>
            <div>{'ens name'}</div>
            <div>{svg.badge(48, theme.top0, theme.good)}</div>
            <div>{hover.name}</div>
            <div>{'verified'}</div>
          </PopRight>
        )
      } else if (hover.type === 'avatar') {
        return (
          <PopRight key='hover:avatar'>
            <div>{'nft pfp/avatar'}</div>
            <div>{svg.badge(48, theme.top0, theme.bad)}</div>
            <div>{hover.name}</div>
            <div>{'verified'}</div>
          </PopRight>
        )
      } else {
        return this.renderDefault()
      }
    } else if (selected) {
      return this.renderDefault()
    } else if (asset) {
      const collectionName = user.inventory[collection].meta.name
      const assetData = user.inventory[collection].assets[asset]
      console.log('Asset', asset, assetData)

      const tokenId = '#' + (assetData.tokenId.length > 10 ? assetData.tokenId.substr(0, 4) + '...' + assetData.tokenId.substr(-4) : assetData.tokenId)

      return (
        <PopRight key={assetData.name}>
          <AssetSummayImage>
            {assetData.img ? <img src={assetData.img} /> : assetData.name}
          </AssetSummayImage>
          <AssetSummayName>
            {assetData.name}
          </AssetSummayName>
          <AssetSummayCollection>
            <div>{collectionName === 'ENS: Ethereum Name Service' ? 'Ethereum Name Service' : collectionName}</div>
            <div>{tokenId}</div>
          </AssetSummayCollection>
          <AssetLink onClick={()=>{
            window.open(assetData.openSeaLink, '_blank')
          }}>
            View on OpenSea
          </AssetLink>
        </PopRight>
      )
    } else if (collection) {
      const collectionData = user.inventory[collection]
      const count = Object.keys(collectionData.assets).length || 0

      return (
        <PopRight key={collectionData.meta.name}>
          <CollectionSummaryTitle>
            {collectionData.meta.name === 'ENS: Ethereum Name Service' ? 'Ethereum Name Service' : collectionData.meta.name}
          </CollectionSummaryTitle>
          <CollectionSummaryImage>
            {collectionData.meta.img ? <img src={collectionData.meta.img} /> : <span>{collectionData.meta.name}</span> }
          </CollectionSummaryImage>
          <CollectionItemCount>
            <CollectionItemCountNumber>
              {count}
            </CollectionItemCountNumber>
            <CollectionItemCountLabel>
              {count === 1 ? 'item' : 'items'}
            </CollectionItemCountLabel>
          </CollectionItemCount>
        </PopRight>
      )
    } else {
      return this.renderDefault()
    }
  }
  render () {
    return (
      <>
        {this.renderContent()}
      </>
    )
  }
}

export default Restore.connect(RightPanel)