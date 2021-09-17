import React from 'react'
import Restore from 'react-restore'
import styled, { keyframes, ThemeProvider } from 'styled-components'

import { cardShowl, float, shake } from '../style'

import { Video, Image } from '../media'

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

const AssetSummaryWrap = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  overscroll-behavior: contain;
`

const PopRightLogo = styled(PopRight)`
  svg {
    height: 80px;
    fill: ${props => props.theme.base1};
    opacity: 1;
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
  position: relative;

  img, video {
    width: 112px;
    height: 112px;
    object-fit: cover;
    border-radius: 2px;
  }

  span {
    width: 112px;
    height: 112px;
    object-fit: cover;
    border-radius: 2px;
    display: flex;
    justify-content: center;
    align-items: center;
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
  font-size: 18px;
  font-weight: 500;
  text-transform: uppercase;
  height: 20px;
  border-radius: 11px;
  padding: 2px 8px 0px 8px;
  min-width 60px;
  display: flex;
  borx-sizing: border-box;
  justify-content: center;
  align-items: center;
  background: ${props => props.theme.base1};
  color: ${props => props.theme.top0};
`

const CollectionItemCountLabel = styled.div`
  font-size: 10px;
  letter-spacing: 2px;
  text-transform: uppercase;
  margin-left: 2px;
  margin-top: 2px;
`

const AssetSummaryImage = styled.div`
  width: 185x;
  height: 185px;
  margin-top: 5px;
  font-weight: 600;
  text-align: center;
  position: relative;

  img, video {
    max-width: 185px;
    max-height: 185px;
    // object-fit: contain;
    border-radius: 6px;
  }

  span, div {
    width: 185px;
    min-height: 185px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 6px;
    position: relative;
  }
`

const AssetSummaryName = styled.div`
  font-size: 12px;
  height: 21px;
  margin: 14px 5px 0px 5px;
  padding: 4px 7px 4px 7px;
  border-radius: 12px;
  text-align: center;
  font-weight: 600;
  overflow: hidden;
  white-space: nowrap;
  max-width: calc(100% - 10px);
  min-width: 60px;
  box-sizing: border-box;
  // display: flex;
  text-align: center;
  // align-items: center;
  background: ${props => props.theme.base1};
  text-overflow: ellipsis;
`

const AssetSummaryCollection = styled.div`
  font-size: 9px;
  letter-spacing: 1px;
  text-transform: uppercase;
  padding-left: 1px;
  text-align: center;
  font-weight: 600;
  margin-top: 9px;
`

const AssetLink = styled.div`
  position: absolute;
  bottom: 5px;
  left: 5px;
  right: 5px;
  height: 30px;
  text-transform: uppercase;
  font-size: 9px;
  font-weight: 600;
  border-radius: 6px;
  display: flex;
  justify-content: center;
  align-items: center;
  background: ${props => props.theme.good};
  color: ${props => props.theme.goodOver};
  cursor: pointer;
  user-select: none;

  &:hover {
    animation: 5s ${float} ease-in-out infinite alternate;
    z-index: 2000;
  }

  &:active {
    animation: ${shake} 2s ease-in-out infinite;
    z-index: 2000;
  }
`

const PopUser = styled.div`
  position: absolute;
  top: 5px;
  right: 0;
  bottom: 0;
  left: 0;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  // justify-content: center;
  align-items: center;
  // animation: ${float} 200ms linear both;
  overscroll-behavior: contain;
  color: ${props => props.theme.top0};
`

const Verified = styled.div`
  font-size: 10px;
  text-transform: lowercase;
  font-weight: 600;
  border-radius: 6px;
  width: calc(100% - 10px);
  margin-bottom: 6px;
  display: flex;
  justify-content: center;
  align-items: center;
`

const PopUserVerified = styled(Verified)`
  div {
    background: ${props => props.theme.good};
    color: ${props => props.theme.goodOver};
  }
`

const PopUserUnverified = styled(Verified)`
  div {
    background: ${props => props.theme.bad};
    color: ${props => props.theme.badOver};
  }
`

const PopUserLine = styled.div`
  width: calc(100% - 6px);
  height: 24px;
  border-radius: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0px 3px;
`

const PopUserLabel = styled.div`
  background: ${props => props.theme.base1};
  font-size: 10px;
  height: 22px;
  border-radius: 6px;
  display: flex;
  justify-content: center;
  align-items: center;
  // flex-direction: column;
  text-transform: uppercase;
  width: 100%;
`

const PopUserBadge = styled.div`
  background: ${props => props.theme.good};
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
  box-sizing: border-box;
  border-radius: 6px;
  font-size: 12px;
  width: calc(100% - 10px);
  margin-bottom: 5px;
`

const ProfileMatch = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 10px;
  height: 20px;
  font-weight: 600;
  margin: 3px 0px 5px 0px;
  width: 100%;
`

const ProfileImage = styled.div`
  width: 185px;
  height: 185px;
  // border-radius: 93px;
  font-weight: 600;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  background: ${props => props.theme.base2};
  border-radius: 6px;
  text-transform: uppercase;
  font-size: 12px;
  font-weight: 400;
  letter-spacing: 2px;

  img, video {
    max-width: 185px;
    max-height: 185px;
    // object-fit: contain;
    border-radius: 6px;
  }
`

const ProfileLinkIcon = styled.div`
  height: 40px;
  width: 100%;
  margin: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: ${props => props.theme.top0};
  svg {
    max-height: 26px;
  }
`

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
    const assetData = user.inventory[collection].assets[asset]
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
    const count = Object.keys(collectionData.assets).length || 0

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