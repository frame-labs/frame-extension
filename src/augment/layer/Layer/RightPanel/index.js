import React from 'react'
import Restore from 'react-restore'

import { Video, Image } from '../media'

import {
  PopRight,
  AssetSummaryWrap,
  PopRightLogo,
  CollectionSummaryTitle,
  CollectionSummaryImage,
  CollectionItemCount,
  CollectionItemCountNumber,
  CollectionItemCountLabel,
  AssetSummaryImage,
  AssetSummaryName,
  AssetSummaryCollection,
  AssetLink,
  PopUser,
  PopUserVerified,
  PopUserUnverified,
  PopUserLabel,
  ProfileMatch,
  ProfileImage,
  ProfileLinkIcon
} from './styled'


class RightPanel extends React.Component {
  constructor (...args) {
    super(...args)
    this.state = {}
  }
  renderUser (user) {
    const theme = this.store('theme')
    const img = user.avatar.img
    return (
      <PopRight key='hover:user'>
        <PopUser>
          <ProfileLinkIcon style={{
            color: user.verified.name ? theme.good : theme.bad
          }}>
          <svg viewBox='0 0 24 24'>
            <path fill='currentColor' d='M14.78 3.653a3.936 3.936 0 115.567 5.567l-3.627 3.627a3.936 3.936 0 01-5.88-.353.75.75 0 00-1.18.928 5.436 5.436 0 008.12.486l3.628-3.628a5.436 5.436 0 10-7.688-7.688l-3 3a.75.75 0 001.06 1.061l3-3z' />
            <path fill='currentColor' d='M7.28 11.153a3.936 3.936 0 015.88.353.75.75 0 001.18-.928 5.436 5.436 0 00-8.12-.486L2.592 13.72a5.436 5.436 0 107.688 7.688l3-3a.75.75 0 10-1.06-1.06l-3 3a3.936 3.936 0 01-5.567-5.568l3.627-3.627z' />
          </svg>
          </ProfileLinkIcon> 
          <ProfileMatch>
            {`@${user.twitter}  -  ${user.name}`}
          </ProfileMatch>
          {user.verified.name ? (
            <>
              <PopUserVerified>
                <PopUserLabel>
                  {'ens name verified'}
                </PopUserLabel>
              </PopUserVerified>
            </>
          ) : (
            <>
              <PopUserUnverified>
                <PopUserLabel>
                  {'ens name unverified'}
                </PopUserLabel>
              </PopUserUnverified>
            </>
          )}
          <ProfileImage>
            {img?.src && img?.type === 'video' ? (
              <Video src={img.src} />
            ) : img?.src && img?.type === 'img' ? (
              <Image src={img.src} />
            ) : <div>{'no nft pfp'}</div>}
          </ProfileImage>
        </PopUser>
      </PopRight>
    )
  }
  renderAsset (user, collection, asset) {
    const collectionName = user.inventory[collection].meta.name
    const assetData = user.inventory[collection].items[asset]
    const tokenId = assetData?.tokenId ? '#' + (assetData.tokenId.length > 9 ? assetData.tokenId.substr(0, 3) + '...' + assetData.tokenId.substr(-3) : assetData.tokenId) : '?'
    const img = assetData.img
    return (
      <PopRight key={assetData.name}>
        <AssetSummaryWrap>
          <AssetSummaryImage>
            {img?.src && img?.type === 'video' ? (
              <Video src={img.src} />
            ) : img?.src && img?.type === 'img' ? (
              <Image src={img.src} />
            ) : <span>{asset.name}</span>}
          </AssetSummaryImage>
          <AssetSummaryName>
            {assetData.name}
          </AssetSummaryName>
          <AssetSummaryCollection>
            <div>{collectionName === 'ENS: Ethereum Name Service' ? 'Ethereum Name Service' : collectionName}</div>
            <div>{tokenId}</div>
          </AssetSummaryCollection>
          <AssetLink onClick={()=>{
            window.open(assetData.openSeaLink + '?ref=0xB813BE9096C52307AE0e46932E33D1D68a21bba1', '_blank')
          }}>
            View on OpenSea
          </AssetLink>
        </AssetSummaryWrap>
      </PopRight>
    )
  }
  renderCollection (user, collection) {
    const collectionData = user.inventory[collection]
    const count = Object.keys(collectionData.items).length || 0

    const img = collectionData.meta.img

    return (
      <PopRight key={collectionData.meta.name}>
        <CollectionSummaryTitle>
          {collectionData.meta.name === 'ENS: Ethereum Name Service' ? 'Ethereum Name Service' : collectionData.meta.name}
        </CollectionSummaryTitle>
        <CollectionSummaryImage>
          {img?.src && img?.type === 'video' ? (
              <Video src={img.src} />
            ) : img?.src && img?.type === 'img' ? (
              <Image src={img.src} />
            ) : <span>{collectionData.meta.name}</span>
          }
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
  }
  renderDefault () {
    return (
      <PopRightLogo key='logo'>
        <svg viewBox='0 0 245 247'>
          <path d='M232,124V46.82A33.82,33.82,0,0,0,198.18,13H123L110,0H36.94A36.94,36.94,0,0,0,0,36.94V111l13,13v76.18A33.82,33.82,0,0,0,46.82,234H123l13,13h72.06A36.94,36.94,0,0,0,245,210.06V137Zm-58,29.41A22.6,22.6,0,0,1,151.41,176H93.59A22.6,22.6,0,0,1,71,153.41V93.59A22.6,22.6,0,0,1,93.59,71h57.82A22.6,22.6,0,0,1,174,93.59Z'/>
        </svg>
      </PopRightLogo>
    )
  }
  render () {
    const { userId  } = this.store('layerPop')
    const user = this.store('users', userId)

    const hover = this.store('hover')
    const select = this.store('select')

    if (select?.type === 'user') {
      return this.renderUser(user)
    } else if (select?.type === 'asset') {
      return this.renderAsset(user, select?.collection, select?.asset) 
    } else if (hover?.type === 'user') {
      return this.renderUser(user)
    } else if (hover?.type === 'asset') {
      return this.renderAsset(user, hover?.collection, hover?.asset)
    } else if (select?.type === 'collection') {
      return this.renderCollection(user, select?.collection) 
    } else if (hover?.type === 'collection') {
      return this.renderCollection(user, hover?.collection) 
    } else {
      return this.renderDefault()
    }
  }
}

export default Restore.connect(RightPanel)
