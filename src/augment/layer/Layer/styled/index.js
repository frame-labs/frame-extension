
import styled from 'styled-components'
import { cardShow, dash, rotate } from '../style'

export const PopWrap = styled.div`
  position: fixed;
  top: 0px;
  left: 0px;
  bottom: 0px;
  right: 0px;
  pointer-events: auto;
`

export const Pop = styled.div`
  position: fixed;
  top: 0px;
  left: 0px;
  width: 440px;
  height: 300px;
  border-radius: 10px;
  z-index: 20000;
  font-family: sans-serif;
  animation: ${cardShow} 400ms linear both;
  overscroll-behavior: contain;
  overflow: hidden;
  color: ${props => props.theme.top0};
  background: ${props => props.theme.base0};
  font-size: 15px;
  box-shadow: 0px 5px 10px ${props => props.theme.baseShadow};
  transform: translate3d(0, 0, 0) rotate(0.01deg);
`

export const Loading = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  text-transform: uppercase;
  font-size: 12px;
  letter-spacing: 2px;
  margin-left: 2px;
  color: ${props => props.theme.top0};
  display: flex;
  flex-direction: column;
`

export const LoadingSpinner = styled.div`
  position: relative;
  width: 50px;
  height: 50px;
  margin-bottom: 10px;
  svg {
    animation: ${rotate} 2s linear infinite;
    z-index: 2;
    position: absolute;
    top: 50%;
    left: 50%;
    margin: -25px 0 0 -25px;
    width: 50px;
    height: 50px;
    
    & circle {
      stroke: ${props => props.theme.top0};
      stroke-linecap: round;
      animation: ${dash} 1.5s ease-in-out infinite;
    }
  }
`