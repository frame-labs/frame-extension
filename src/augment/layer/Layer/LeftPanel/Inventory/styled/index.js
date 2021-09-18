import styled from 'styled-components'
import { float, shake } from '../../../style'

export const InventoryWrap = styled.div`
  position: absolute;
  top: 58px;
  left: 5px;
  bottom: 5px;
  right: 5px;
`

export const InventoryNone = styled.div`
  text-align: center;
  border-radius: 7px;
  box-sizing: border-box;
  height: 200px;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  text-transform: uppercase;
  font-size: 12px;
  font-weight: 400;
  span {
    letter-spacing: 2px;
    margin-left: 2px;
  }
`

export const InventoryHeader = styled.div`
  position: relative;
  font-size: 10px;
  text-align: center;
  width; 100%;
  text-transform: uppercase;
  font-weight: 600;
  letter-spacing: 1px;
  position: realative;
  height: 19px;
  display: flex;
  justify-content: center;
  align-items: center;
`

export const InventoryHeaderBack = styled.div`
  position: absolute;
  left: 3px;
  top: 3px;
  bottom: 0px;
  width: 26px;
  height: 14px;
  border-radius: 7px;
  background: ${props => props.theme.good};
  color: ${props => props.theme.goodOver};
  cursor: pointer;

  svg {
    position: relative;
    width: 12px;
    top: 0px;
  }

  &:hover {
    animation: 5s ${float} ease-in-out infinite alternate;
    box-shadow: 0px 3px 5px 0px ${props => props.theme.baseShadow};
  }

  &:active {
    animation: ${shake} 2s ease-in-out infinite;
    box-shadow: 0px 1px 2px 0px ${props => props.theme.baseShadow};
  }
`

export const InventoryHeaderText = styled.span`
  margin-left: 20px;
`

export const ItemWrap = styled.div`
  position: absolute;
  top: 24px;
  left: 0px;
  bottom: 0px;
  right: 0px;
  border-radius: 6px;
  background: ${props => props.theme.base1};
`
export const ItemScroll = styled.div`
  position: absolute;
  top: 0;
  right: -50px;
  bottom: 0;
  left: 0;
  padding-right: 50px;
  overflow-y: scroll;
  overflow-x: hidden;
  overscroll-behavior: contain;
`

export const PopCollectionsWrapper = styled.div`
  text-align: center;
  display: flex;
  flex-wrap: wrap;
  align-content: flex-start;
  border-radius: 7px;
  padding: 6px 5px 6px 5px;
  box-sizing: border-box;
  min-height: calc(100% + 1px);
`