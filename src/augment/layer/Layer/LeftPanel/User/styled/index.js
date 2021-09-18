import styled from 'styled-components'
import { float, shake } from '../../../style'

export const PopAvatarImg = styled.div`
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

export const PopNameVerifed = styled.div`
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

export const PopName = styled.div`
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

export const PopNameVerifedIcon = styled.div`
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
export const PopNameText = styled.div``

export const NameSelect = styled.div`
  position: absolute;
  top: -3px;
  right: -3px;
  bottom: -3px;
  left: -3px;
  border-radius: 9px;
  border: 2px solid ${props => props.theme.top0};
  z-index: 20000;
`