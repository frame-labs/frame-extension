import React from 'react'
import Restore from 'react-restore'
import styled, { keyframes, ThemeProvider } from 'styled-components'

import { float, shake } from '../../style'

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
    box-shadow: 0px 3px 5px 2px ${props => props.theme.base0};
    background: ${props => props.theme.base2};
    z-index: 2000;
  }

  &:active {
    animation: ${shake} 2s ease-in-out infinite;
    box-shadow: 0px 2px 3px 2px ${props => props.theme.base0};
    background: ${props => props.theme.base2};
    z-index: 2000;
  }
`

const PopNameVerifed  = styled.div`
  text-align: center;
  font-size: 10px;
  font-weight: 600;
  text-transform: uppercase;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 4px;
  width: 26px;
  height: 26px;
  position: absolute;
  right: 10px;
  overflow: hidden;
  pointer-events: auto;
  transition: 200ms cubic-bezier(.82,0,.12,1) all;
  background: ${props => props.theme.base0}
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
    height: 16px;
  }
`

const PopAvatarImg = styled.div`
  position: absolute;
  top: 0px;
  left: 0px;
  bottom: 0px;
  width: 48px;
  height: 48px;
  border-radius: 6px;
  border-top-right-radius: 0px;
  border-bottom-right-radius: 0px;
  background: ${props => props.theme.base2};

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 6px;
    border-top-right-radius: 0px;
    border-bottom-right-radius: 0px
  }
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

class User extends React.Component {
  constructor (...args) {
    super(...args)
    this.state = {
      hovered: false
    }
  }
  render () {
    const theme = this.store('theme')
    const { ensName } = this.store('layerPop')
    const user = this.store('users', ensName)
    return (
      <PopName 
        onMouseEnter={(e)=>{
          this.store.setHover({
            type: 'name',
            ensName: 'brantly.eth'
          })
        }}
        onMouseLeave={(e)=>{
          this.store.setHover(false)
        }}
      >
        {/* <PopLogo>
          <svg viewBox="0 0 245 247">
            <path d="M232,124V46.82A33.82,33.82,0,0,0,198.18,13H123L110,0H36.94A36.94,36.94,0,0,0,0,36.94V111l13,13v76.18A33.82,33.82,0,0,0,46.82,234H123l13,13h72.06A36.94,36.94,0,0,0,245,210.06V137Zm-58,29.41A22.6,22.6,0,0,1,151.41,176H93.59A22.6,22.6,0,0,1,71,153.41V93.59A22.6,22.6,0,0,1,93.59,71h57.82A22.6,22.6,0,0,1,174,93.59Z"/>
          </svg>
        </PopLogo> */}
        <PopAvatarImg>
          <img src={user.avatar} />
        </PopAvatarImg>
        {user.name}
        {user.verified.name ? (
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
      </PopName>
    )
  }
}

export default Restore.connect(User)
