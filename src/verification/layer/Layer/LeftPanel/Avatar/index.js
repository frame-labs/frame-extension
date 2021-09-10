import React from 'react'
import Restore from 'react-restore'
import styled, { keyframes, ThemeProvider } from 'styled-components'

const PopAvatar = styled.div`
  width: 100%;
  height: 74px;
  position: relative;
`
const PopAvatarImg = styled.div`
  position: absolute;
  top: 5px;
  left: 5px;
  bottom: 5px;
  width: 64px;
  height: 64px;
  border-radius: 6px;
  background: ${props => props.theme.base2};

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 6px;
  }
`
const PopAvatarMeta = styled.div`
  position: absolute;
  top: 5px;
  right: 5px;
  bottom: 5px;
  left: 74px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  border-radius: 6px;
  background: ${props => props.theme.base2};
  padding: 5px 5px 17px 5px;
  font-size: 12px;
  font-weight: 600;
`
const PopAvatarMetaName = styled.div`
`
const PopAvatarMetaCollection = styled.div`
  font-size: 9px;
  font-weight: 400;
`
const PopAvatarMetaTokenNumber = styled.div`
  font-size: 9px;
  font-weight: 400;
`

const PopAvatarMetaVerified = styled.div`
`

const AvatarLabel = styled.div`
  position: absolute;
  bottom: 2px;
  left: 2px;
  right: 2px;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 9px;
  font-weight: 600;
  text-transform: uppercase;
  border-radius: 4px;
  height: 12px;
  padding: 1px 5px 0px 5px;
  background: ${props => props.theme.base4};
`

const AvatarLabelGood = styled(AvatarLabel)`
  background: ${props => props.theme.good};
  color: ${props => props.theme.goodOver};
`

const AvatarLabelBad = styled(AvatarLabel)`
`


class Avatar extends React.Component {
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

    if (selectedCollection) console.log(user.inventory[selectedCollection])

    return (
      <PopAvatar>
        <PopAvatarImg>
          <img src={user.avatar} />
        </PopAvatarImg>
        <PopAvatarMeta>
          <PopAvatarMetaName>NFT NAME</PopAvatarMetaName>
          <PopAvatarMetaCollection>NFT COLLECTION</PopAvatarMetaCollection>
          <PopAvatarMetaTokenNumber>#192034</PopAvatarMetaTokenNumber>
          <PopAvatarMetaVerified>
            {user.verified.avatar ? (
              <AvatarLabelGood>
                Ownership Verified 
              </AvatarLabelGood>    
            ) : (
              <AvatarLabelBad>
                Ownership Unverified 
              </AvatarLabelBad>
            )}
          </PopAvatarMetaVerified>
        </PopAvatarMeta>
      </PopAvatar>
    )
  }
}

export default Restore.connect(Avatar)