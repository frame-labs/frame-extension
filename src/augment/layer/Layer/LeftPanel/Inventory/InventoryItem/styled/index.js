import styled from 'styled-components'

import { float, shake } from '../../../../style'

export const PopCollection = styled.div`
  width: 48px;
  height: 48px;
  border-radius: 3px;
  padding: 5px 4px 4px 5px;
  cursor: pointer;
  word-break: break-word;
  user-select: none;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;

  img {
    width: 48px;
    height: 48px;
    object-fit: cover;
    border-radius: 3px;
    background: ${props => props.theme.base0};
  }

  video {
    width: 48px;
    height: 48px;
    object-fit: cover;
    border-radius: 3px;
    background: ${props => props.theme.base0};
  }

  &:hover {
    transform: scale(1.2);
    z-index: 2000;
    img, div {
      animation: 5s ${float} ease-in-out infinite alternate;
      box-shadow: 0px 8px 6px -2px ${props => props.theme.baseShadow};
    }
  }

  &:active {
    z-index: 2000;
    img, div {
      animation: ${shake} 2s ease-in-out infinite;
      box-shadow: 0px 1px 1px -2px ${props => props.theme.baseShadow};
    }
  }
`

export const ItemSelected = styled.div`
  position: absolute;
  top: 2px;
  right: 1px; 
  bottom: 1px;
  left: 2px;
  border: 2px solid ${props => props.theme.top0};
  border-radius: 6px;
  z-index: 20000;
`

export const TextImg = styled.div`
  width: 48px;
  height: 48px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 3px;
  font-size: 8px;
  padding: 5px;
  box-sizing: border-box;
  background: ${props => props.theme.base0};
  position: relative;
`
