import React from 'react'
import Restore from 'react-restore'
import styled, { keyframes, ThemeProvider } from 'styled-components'
import { cardShow, float, shake } from '../../style'

const PopAvatarImg = styled.div`
  position: absolute;
  top: 0px;
  left: 10px;
  bottom: 0px;
  width: 48px;
  height: 48px;
  border-radius: 6px;
  background: ${props => props.theme.base2};

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 6px;
  }
`

const PopAvatar = styled.div`
  width: calc(100% - 10px);
  margin: 5px;
  height: 48px;
  position: relative;
  border-radius: 6px;
  background: ${props => props.theme.base1};
  cursor: pointer;
  user-select: none;

  &:hover {
    // background: ${props => props.theme.base2};
    animation: 5s ${float} ease-in-out infinite alternate;
    box-shadow: 0px 3px 5px 2px ${props => props.theme.base0};
    background: ${props => props.theme.base2};
    z-index: 2000;
    
    ${PopAvatarImg} {
      background: ${props => props.theme.base3};
    }
  }

  &:active {
    animation: ${shake} 2s ease-in-out infinite;
    box-shadow: 0px 2px 3px 2px ${props => props.theme.base0};
    background: ${props => props.theme.base2};
    z-index: 2000;

    ${PopAvatarImg} {
      background: ${props => props.theme.base3};
    }
  }
`

const PopAvatarMeta = styled.div`
  position: absolute;
  top: 0px;
  right: 58px;
  bottom: 0px;
  left: 58px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  border-radius: 6px;
  // background: ${props => props.theme.base2};
  padding: 8px;
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
  position: absolute;
  right: 0;
`

const PopNameVerifed  = styled.div`
  text-align: center;
  font-size: 10px;
  font-weight: 600;
  text-transform: uppercase;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 3px;
  width: 26px;
  height: 26px;
  position: absolute;
  top: 11px;
  right: 11px;
  overflow: hidden;
  pointer-events: auto;
  transition: 200ms cubic-bezier(.82,0,.12,1) all;
  background: ${props => props.theme.base0};

  // &:hover {
  //   width: 164px;
  // }
`

const PopNameVerifedIcon = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 26px;
  height: 26px;
  pointer-events: none;
  svg {
    height: 14px;
  }
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
    const theme = this.store('theme')
    const user = this.store('users', ensName)
    const selectedCollection = this.store('inventory.selectedCollection')

    // if (selectedCollection) console.log(user.inventory[selectedCollection])

    return (
      <PopAvatar             
        onMouseEnter={(e)=>{
          this.store.setHover({
            type: 'avatar',
            ensName: 'brantly.eth'
          })
        }}
        onMouseLeave={(e)=>{
          this.store.setHover(false)
        }}
      >
        <PopAvatarImg>
          <img src={user.avatar} />
        </PopAvatarImg>
        <PopAvatarMeta>
          <PopAvatarMetaName>NFT NAME</PopAvatarMetaName>
          <PopAvatarMetaCollection>NFT COLLECTION</PopAvatarMetaCollection>
          <PopAvatarMetaTokenNumber>#192034</PopAvatarMetaTokenNumber>
        </PopAvatarMeta>
        {user.verified.avatar ? (
            <PopNameVerifed style={{ color: theme.good }}>
              <PopNameVerifedIcon>
                <svg viewBox="0 0 512 512">
                  <path fill="currentColor" d="M173.898 439.404l-166.4-166.4c-9.997-9.997-9.997-26.206 0-36.204l36.203-36.204c9.997-9.998 26.207-9.998 36.204 0L192 312.69 432.095 72.596c9.997-9.997 26.207-9.997 36.204 0l36.203 36.204c9.997 9.997 9.997 26.206 0 36.204l-294.4 294.401c-9.998 9.997-26.207 9.997-36.204-.001z" />
                </svg>
              </PopNameVerifedIcon>
            </PopNameVerifed>    
          ) : (
            <PopNameVerifed style={{ color: theme.bad }}>
              <PopNameVerifedIcon>
                <svg viewBox="0 0 640 512">
                  <path fill="currentColor" d="M594.53 508.63L6.18 53.9c-6.97-5.42-8.23-15.47-2.81-22.45L23.01 6.18C28.43-.8 38.49-2.06 45.47 3.37L633.82 458.1c6.97 5.42 8.23 15.47 2.81 22.45l-19.64 25.27c-5.42 6.98-15.48 8.23-22.46 2.81z" />
                </svg>
              </PopNameVerifedIcon>
            </PopNameVerifed>   
          )}
      </PopAvatar>
    )
  }
}

export default Restore.connect(Avatar)