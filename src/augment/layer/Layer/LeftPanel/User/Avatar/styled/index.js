import styled from 'styled-components'
import { float, shake } from '../../../../style'

export const PopAvatarImg = styled.div`
  position: absolute;
  top: 0px;
  left: 0px;
  bottom: 0px;
  width: 48px;
  height: 48px;
  border-radius: 6px;
  background: ${(props) => props.theme.base2};

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 6px;
  }
`

export const PopAvatar = styled.div`
  width: calc(100% - 10px);
  margin: 5px;
  height: 48px;
  position: relative;
  border-radius: 6px;
  background: ${(props) => props.theme.base1};
  cursor: pointer;
  user-select: none;

  &:hover {
    // background: ${(props) => props.theme.base2};
    animation: 5s ${float} ease-in-out infinite alternate;
    box-shadow: 0px 3px 5px 2px ${(props) => props.theme.base0};
    background: ${(props) => props.theme.base2};
    z-index: 2000;

    ${PopAvatarImg} {
      background: ${(props) => props.theme.base3};
    }
  }

  &:active {
    animation: ${shake} 2s ease-in-out infinite;
    box-shadow: 0px 2px 3px 2px ${(props) => props.theme.base0};
    background: ${(props) => props.theme.base2};
    z-index: 2000;

    ${PopAvatarImg} {
      background: ${(props) => props.theme.base3};
    }
  }
`

export const PopAvatarMeta = styled.div`
  position: absolute;
  top: 0px;
  right: 58px;
  bottom: 0px;
  left: 58px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  border-radius: 6px;
  padding: 8px;
  font-size: 12px;
  font-weight: 600;
`
export const PopAvatarMetaName = styled.div``
export const PopAvatarMetaCollection = styled.div`
  font-size: 9px;
  font-weight: 400;
`
export const PopAvatarMetaTokenNumber = styled.div`
  font-size: 9px;
  font-weight: 400;
`

export const PopNameVerifed = styled.div`
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
  transition: 200ms cubic-bezier(0.82, 0, 0.12, 1) all;
  background: ${(props) => props.theme.base0};
`

export const PopNameVerifedIcon = styled.div`
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
