import React from 'react'
import Restore from 'react-restore'
import styled, { keyframes, ThemeProvider } from 'styled-components'

import { float, shake } from '../../style'
import { Video, Image } from '../../media'


const PopAvatarImg = styled.div`
  position: absolute;
  top: 0px;
  right: 0px;
  bottom: 0px;
  width: 48px;
  height: 48px;
  border-radius: 6px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: ${props => props.theme.base0};

  img {
    width: 30px;
    height: 30px;
    object-fit: cover;
    border-radius: 3px;
    margin: 4px;
  }

  svg {
    height: 22px;
    width: 22px;
  }
`

const PopNameVerifed = styled.div`
  text-align: center;
  font-size: 10px;
  font-weight: 600;
  text-transform: uppercase;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 6px;
  width: 48px;
  height: 48px;
  position: absolute;
  left: 0px;
  overflow: hidden;
  pointer-events: auto;
`

const PopName = styled.div`
  top: 5px;
  right: 5px;
  bottom: 0;
  left: 5px;
  position: absolute;
  height: 48px;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 20000;
  font-weight: 400;
  border-radius: 6px;
  background: ${props => props.theme.base1};
  cursor: pointer;

  &:hover {
    animation: 5s ${float} ease-in-out infinite alternate;
    background: ${props => props.theme.base2};
    z-index: 2000;
  }

  &:active {
    animation: ${shake} 2s ease-in-out infinite;
    background: ${props => props.theme.base2};
    z-index: 2000;
  }
`

const PopNameSelected = styled(PopName)`
  border: 2px solid ${props => props.theme.top0};
`

const PopNameVerifedIcon = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 48px;
  height: 48px;
  pointer-events: none;
  svg {
    height: 16px;
  }
`
const PopNameText = styled.div`
  // position: absolute;
  // top: 0;
  // left: 40px;
  // bottom: 1px;
  // display: flex;
  // justify-content: center;
  // align-items: center;
  // font-size: 16px;
`


// const PopNameVerifedMessage = styled.div`
//   position: absolute;
//   top: 0;
//   right: 24px;
//   bottom: 0;
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   height: 24px;
//   padding: 0px 1px 0px 5px;
//   pointer-events: none;
//   min-width: 130px;
// `

const PopLogo = styled.div`
  position: absolute;
  left: 11px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 5px;

  svg {
    height: 22px;
    fill: ${props => props.theme.top0};
  }

`

const NameSelect = styled.div`
  position: absolute;
  top: -3px;
  right: -3px;
  bottom: -3px;
  left: -3px;
  border-radius: 9px;
  border: 2px solid ${props => props.theme.top0};
  z-index: 20000;
`

class User extends React.Component {
  constructor (...args) {
    super(...args)
    this.state = {
      hovered: false
    }
  }
  badge (size) {
    const theme = this.store('theme')
    const { userId } = this.store('layerPop')
    const user = this.store('users', userId)

    let color, background
    if (user && !user.error && user.verified.name) {
      color = theme.badge.verified.color
      background = theme.badge.verified.background
    } else if (user) {
      color = theme.badge.unverified.color
      background = theme.badge.unverified.background
    } else {
      color = theme.badge.default.color
      background = theme.badge.default.background
    }

    return (
      <svg style={{ height: `${size}px`, width: `${size}px` }}  viewBox='0 0 84 84'>
        <path fill={background} d='M84,44a16.1,16.1,0,0,0-8.59-14.4,16.63,16.63,0,0,0,1-5.6c0-8.84-6.84-16-15.27-16a14.2,14.2,0,0,0-5.34,1A15,15,0,0,0,28.26,9a14.45,14.45,0,0,0-5.35-1C14.47,8,7.64,15.16,7.64,24a16.63,16.63,0,0,0,1,5.6,16.38,16.38,0,0,0-.82,28.34A17.53,17.53,0,0,0,7.64,60c0,8.84,6.83,16,15.27,16a14.4,14.4,0,0,0,5.34-1,15,15,0,0,0,27.5,0,14.6,14.6,0,0,0,5.34,1c8.44,0,15.27-7.16,15.27-16a15.57,15.57,0,0,0-.13-2.05A16.16,16.16,0,0,0,84,44Z'/>
        <path fill={color} d='M60.08,39.1,43,16.13a1,1,0,0,0-1.77,0l-17.08,23a1,1,0,0,0,.35,1.4l17.08,8.69a1,1,0,0,0,1.08,0L59.74,40.5A1,1,0,0,0,60.08,39.1Zm-1.4,8.25L42.74,56.47a1.18,1.18,0,0,1-1.25,0L25.55,47.35A.41.41,0,0,0,25,48L41.14,68a1.19,1.19,0,0,0,2,0L59.21,48A.41.41,0,0,0,58.68,47.35Z'/>
      </svg>
    )
  }
  render () {
    const theme = this.store('theme')
    const { userId } = this.store('layerPop')
    const user = this.store('users', userId)
    const select = this.store('select')
    const img = user.avatar.thumbnail

    return (
      <PopName
        onMouseEnter={(e)=>{
          this.store.setHover({ type: 'user', userId })
        }}
        onClick={(e) => {
          if (this.store('select')?.type === 'user') {
            this.store.setSelect(false)
          } else {
            this.store.setSelect({ type: 'user', userId })
          }
        }}
        onMouseLeave={(e) => {
          this.store.setHover(false)
        }}
      >
        {select?.type === 'user' ? <NameSelect /> : null}
        {/* <PopLogo>
          <svg viewBox='0 0 245 247'>
            <path d='M232,124V46.82A33.82,33.82,0,0,0,198.18,13H123L110,0H36.94A36.94,36.94,0,0,0,0,36.94V111l13,13v76.18A33.82,33.82,0,0,0,46.82,234H123l13,13h72.06A36.94,36.94,0,0,0,245,210.06V137Zm-58,29.41A22.6,22.6,0,0,1,151.41,176H93.59A22.6,22.6,0,0,1,71,153.41V93.59A22.6,22.6,0,0,1,93.59,71h57.82A22.6,22.6,0,0,1,174,93.59Z'/>
          </svg>
        </PopLogo> */}
        <PopAvatarImg>
          {img?.src && img.type === 'video' ? (
            <Video src={img.src} soundOff={true} />
          ) : img?.src && img.type === 'img' ? (
            <Image src={img.src} />
          ) : (
            <svg viewBox='0 0 245 247'>
              <path fill='currentColor' d='M232,124V46.82A33.82,33.82,0,0,0,198.18,13H123L110,0H36.94A36.94,36.94,0,0,0,0,36.94V111l13,13v76.18A33.82,33.82,0,0,0,46.82,234H123l13,13h72.06A36.94,36.94,0,0,0,245,210.06V137Zm-58,29.41A22.6,22.6,0,0,1,151.41,176H93.59A22.6,22.6,0,0,1,71,153.41V93.59A22.6,22.6,0,0,1,93.59,71h57.82A22.6,22.6,0,0,1,174,93.59Z'/>
            </svg>
          )}
        </PopAvatarImg>
        <PopNameText>
          {user.name}
        </PopNameText>
        <PopNameVerifed>
          <PopNameVerifedIcon>
            {this.badge(24)}
          </PopNameVerifedIcon>
        </PopNameVerifed>    
      </PopName>
    )
  }
}

export default Restore.connect(User)
