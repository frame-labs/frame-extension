import React from 'react'
import Restore from 'react-restore'
import styled, { keyframes, ThemeProvider } from 'styled-components'

import Inventory from './Inventory'
import { cardShow } from '../style'

const PopLeft = styled.div`
  position: absolute;
  top: 0px;
  right: 190px;
  bottom: 0px;
  left: 0px;
  border-radius: 10px;
  z-index: 300;
  overflow: hidden;
  background: ${props => props.theme.base1};
`

const PopName = styled.div`
  // position: absolute;
  // left: 5px;
  // right: 5px;
  margin: 0px 5px;
  position: relative;
  height: 48px;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 20000;
  font-weight: 400;
  pointer-events: none;
  border-radius: 6px;
  background: ${props => props.theme.base2};
`

const VerifiedLabel = styled.div`
  text-align: center;
  font-size: 8px;
  font-weight: 600;
  text-transform: uppercase;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 5px;
  height: 22px;
  padding: 0px 5px;
`

const AvatarLabel = styled.div`
  text-align: center;
  font-size: 8px;
  font-weight: 600;
  text-transform: uppercase;
  display: inline;
  border-radius: 5px;
  height: 8px;
  padding: 0px 5px;
`

const PopNameVerifed = styled(VerifiedLabel)`
  position: absolute;
  right: 5px;
`

const PopInset = styled.div`
  position: absolute;
  top: 0;
  right: -15px;
  bottom: 0;
  left: 0;
  padding-right: 15px;
  padding-top: 5px;
  padding-bottom: 48px;
  overflow-y: scroll;
  overflow-x: hidden;
  overscroll-behavior: contain;
`

const PopAvatar = styled.div`
  width: 100%;
  height: 96px;
  position: relative;
`
const PopAvatarImg = styled.div`
  position: absolute;
  top: 5px;
  left: 5px;
  bottom: 5px;
  width: 86px;
  height: 86px;
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
  left: 96px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  border-radius: 6px;
  background: ${props => props.theme.base2};
  padding: 5px;
`
const PopAvatarMetaName = styled.div`
  font-size: 12px;
  font-weight: 400;

`
const PopAvatarMetaId = styled.div`
`
const PopAvatarMetaVerified = styled.div`
`

class LeftPanel extends React.Component {
  constructor (...args) {
    super(...args)
    this.state = {}
  }
  render () {
    const theme = this.store('theme')
    console.log('this.props', this.props)
    const { active, position, ensName, created } = this.store('layerPop')
    const user = this.store('users', ensName)
    console.log('USER IN LEFT PANEL', user)
    return (
      <PopLeft>
        <PopInset>
          <PopName>
            {user.name}
            {user.verified.name ? (
              <PopNameVerifed style={{ backgroundColor: theme.good, color: theme.goodOver }}>
                Verified
              </PopNameVerifed>    
            ) : (
              <PopNameVerifed style={{ backgroundColor: theme.bad, color: theme.badOver }}>
                Unverified
              </PopNameVerifed>
            )}
          </PopName>
          <PopAvatar>
            <PopAvatarImg>
              <img src={user.avatar} />
            </PopAvatarImg>
            <PopAvatarMeta>
              <PopAvatarMetaName>TOKEN</PopAvatarMetaName>
              <PopAvatarMetaId>#192034</PopAvatarMetaId>
              <PopAvatarMetaVerified>
                {user.verified.avatar ? (
                  <AvatarLabel style={{ backgroundColor: theme.good}}>
                    Verified
                  </AvatarLabel>    
                ) : (
                  <AvatarLabel style={{ backgroundColor: theme.bad}}>
                    Not verified
                  </AvatarLabel>
                )}
              </PopAvatarMetaVerified>
            </PopAvatarMeta>
          </PopAvatar>
          <Inventory />
        </PopInset>
      </PopLeft>
    )
  }
}

export default Restore.connect(LeftPanel)