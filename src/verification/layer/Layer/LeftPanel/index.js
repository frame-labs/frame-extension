import React from 'react'
import Restore from 'react-restore'
import styled, { keyframes, ThemeProvider } from 'styled-components'

import Inventory from './Inventory'
import Avatar from './Avatar'
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

const PopNameVerifed  = styled.div`
  text-align: center;
  font-size: 10px;
  font-weight: 600;
  text-transform: uppercase;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 4px;
  width: 24px;
  height: 24px;
  position: absolute;
  right: 9px;
  overflow: hidden;
  pointer-events: auto;
  transition: 200ms cubic-bezier(.82,0,.12,1) all;

  &:hover {
    width: 164px;
  }
`

const PopNameVerifedIcon = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 24px;
  height: 24px;
  pointer-events: none;
  svg {
    height: 16px;
  }
`

const PopNameVerifedMessage = styled.div`
  position: absolute;
  top: 0;
  right: 24px;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 24px;
  padding: 0px 1px 0px 5px;
  pointer-events: none;
  min-width: 130px;
`

const PopLogo = styled.div`
  position: absolute;
  left: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 5px;
  
  svg {
    height: 22px;
    fill: ${props => props.theme.top0};
  }

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


class LeftPanel extends React.Component {
  constructor (...args) {
    super(...args)
    this.state = {}
  }
  render () {
    const theme = this.store('theme')
    const { ensName } = this.store('layerPop')
    const user = this.store('users', ensName)
    return (
      <PopLeft>
        <PopInset>
          <PopName>
            <PopLogo>
              <svg viewBox="0 0 245 247">
                <path d="M232,124V46.82A33.82,33.82,0,0,0,198.18,13H123L110,0H36.94A36.94,36.94,0,0,0,0,36.94V111l13,13v76.18A33.82,33.82,0,0,0,46.82,234H123l13,13h72.06A36.94,36.94,0,0,0,245,210.06V137Zm-58,29.41A22.6,22.6,0,0,1,151.41,176H93.59A22.6,22.6,0,0,1,71,153.41V93.59A22.6,22.6,0,0,1,93.59,71h57.82A22.6,22.6,0,0,1,174,93.59Z"/>
              </svg>
            </PopLogo>
            {user.name}
            {user.verified.name ? (
              <PopNameVerifed style={{ backgroundColor: theme.good, color: theme.goodOver }}>
                <PopNameVerifedIcon>
                  <svg viewBox="0 0 512 512">
                    <path fill="currentColor" d="M173.898 439.404l-166.4-166.4c-9.997-9.997-9.997-26.206 0-36.204l36.203-36.204c9.997-9.998 26.207-9.998 36.204 0L192 312.69 432.095 72.596c9.997-9.997 26.207-9.997 36.204 0l36.203 36.204c9.997 9.997 9.997 26.206 0 36.204l-294.4 294.401c-9.998 9.997-26.207 9.997-36.204-.001z" />
                  </svg>
                </PopNameVerifedIcon>
                <PopNameVerifedMessage>
                  ENS NAME VERIFIED
                </PopNameVerifedMessage>
              </PopNameVerifed>    
            ) : (
              <PopNameVerifed style={{ backgroundColor: theme.bad, color: theme.badOver }}>
                <PopNameVerifedIcon>
                  <svg viewBox="0 0 640 512">
                    <path fill="currentColor" d="M594.53 508.63L6.18 53.9c-6.97-5.42-8.23-15.47-2.81-22.45L23.01 6.18C28.43-.8 38.49-2.06 45.47 3.37L633.82 458.1c6.97 5.42 8.23 15.47 2.81 22.45l-19.64 25.27c-5.42 6.98-15.48 8.23-22.46 2.81z" />
                  </svg>
                </PopNameVerifedIcon>
                <PopNameVerifedMessage>
                  ENS NAME UNVERIFIED
                </PopNameVerifedMessage>
              </PopNameVerifed>   
            )}
          </PopName>
          <Avatar />
          <Inventory />
        </PopInset>
      </PopLeft>
    )
  }
}

export default Restore.connect(LeftPanel)