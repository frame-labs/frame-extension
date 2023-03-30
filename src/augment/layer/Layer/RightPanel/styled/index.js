import styled from 'styled-components'

import { float, shake } from '../../style'

export const PopRight = styled.div`
  position: absolute;
  top: 0;
  right: 0px;
  bottom: 0;
  width: 195px;
  z-index: 200;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  overscroll-behavior: contain;
  color: ${(props) => props.theme.top0};
`

export const AssetSummaryWrap = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  overscroll-behavior: contain;
`

export const PopRightLogo = styled(PopRight)`
  svg {
    height: 80px;
    fill: ${(props) => props.theme.base1};
    opacity: 1;
  }
`

export const CollectionSummaryTitle = styled.div`
  width: 100%;
  font-size: 12px;
  text-align: center;
  font-weight: 600;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  max-width: 100%;
  box-sizing: border-box;
  padding: 0px 8px 5px 8px;
  margin-top: 8px;
`

export const CollectionSummaryImage = styled.div`
  width: 112px;
  height: 112px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: 600;
  border-radius: 56px;
  overflow: hidden;
  background: ${(props) => props.theme.base1};
  text-align: center;
  margin: 8px;
  position: relative;

  img,
  video {
    width: 112px;
    height: 112px;
    object-fit: cover;
    border-radius: 2px;
  }

  span {
    width: 112px;
    height: 112px;
    object-fit: cover;
    border-radius: 2px;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 16px;
  }
`

export const CollectionItemCount = styled.div`
  width: 100%;
  height: 48px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-weight: 600;
  position: relative;
`

export const CollectionItemCountNumber = styled.div`
  font-size: 18px;
  font-weight: 500;
  text-transform: uppercase;
  height: 20px;
  border-radius: 11px;
  padding: 2px 8px 0px 8px;
  min-width 60px;
  display: flex;
  borx-sizing: border-box;
  justify-content: center;
  align-items: center;
  background: ${(props) => props.theme.base1};
  color: ${(props) => props.theme.top0};
`

export const CollectionItemCountLabel = styled.div`
  font-size: 10px;
  letter-spacing: 2px;
  text-transform: uppercase;
  margin-left: 2px;
  margin-top: 2px;
`

export const AssetSummaryImage = styled.div`
  width: 185x;
  height: 185px;
  margin-top: 5px;
  font-weight: 600;
  text-align: center;
  position: relative;

  img,
  video {
    max-width: 185px;
    max-height: 185px;
    border-radius: 6px;
  }

  span,
  div {
    width: 185px;
    min-height: 185px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 6px;
    position: relative;
  }
`

export const AssetSummaryName = styled.div`
  font-size: 12px;
  height: 21px;
  margin: 14px 5px 0px 5px;
  padding: 4px 7px 4px 7px;
  border-radius: 12px;
  text-align: center;
  font-weight: 600;
  overflow: hidden;
  white-space: nowrap;
  max-width: calc(100% - 10px);
  min-width: 60px;
  box-sizing: border-box;
  text-align: center;
  background: ${(props) => props.theme.base1};
  text-overflow: ellipsis;
`

export const AssetSummaryCollection = styled.div`
  font-size: 9px;
  letter-spacing: 1px;
  text-transform: uppercase;
  padding-left: 1px;
  text-align: center;
  font-weight: 600;
  margin-top: 9px;
`

export const AssetLink = styled.div`
  position: absolute;
  bottom: 5px;
  left: 5px;
  right: 5px;
  height: 30px;
  text-transform: uppercase;
  font-size: 9px;
  font-weight: 600;
  border-radius: 6px;
  display: flex;
  justify-content: center;
  align-items: center;
  background: ${(props) => props.theme.good};
  color: ${(props) => props.theme.goodOver};
  cursor: pointer;
  user-select: none;

  &:hover {
    animation: 5s ${float} ease-in-out infinite alternate;
    z-index: 2000;
  }

  &:active {
    animation: ${shake} 2s ease-in-out infinite;
    z-index: 2000;
  }
`

export const PopUser = styled.div`
  position: absolute;
  top: 5px;
  right: 0;
  bottom: 0;
  left: 0;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  align-items: center;
  overscroll-behavior: contain;
  color: ${(props) => props.theme.top0};
`

export const Verified = styled.div`
  font-size: 10px;
  text-transform: lowercase;
  font-weight: 600;
  border-radius: 6px;
  width: calc(100% - 10px);
  margin-bottom: 6px;
  display: flex;
  justify-content: center;
  align-items: center;
`

export const PopUserVerified = styled(Verified)`
  div {
    background: ${(props) => props.theme.good};
    color: ${(props) => props.theme.goodOver};
  }
`

export const PopUserUnverified = styled(Verified)`
  div {
    background: ${(props) => props.theme.bad};
    color: ${(props) => props.theme.badOver};
  }
`

export const PopUserLabel = styled.div`
  background: ${(props) => props.theme.base1};
  font-size: 10px;
  height: 22px;
  border-radius: 6px;
  display: flex;
  justify-content: center;
  align-items: center;
  text-transform: uppercase;
  width: 100%;
`

export const ProfileMatch = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 10px;
  height: 20px;
  font-weight: 600;
  margin: 3px 0px 5px 0px;
  width: 100%;
`

export const ProfileImage = styled.div`
  width: 185px;
  height: 185px;
  font-weight: 600;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  background: ${(props) => props.theme.base2};
  border-radius: 6px;
  text-transform: uppercase;
  font-size: 12px;
  font-weight: 400;
  letter-spacing: 2px;

  img,
  video {
    max-width: 185px;
    max-height: 185px;
    border-radius: 6px;
  }
`

export const ProfileLinkIcon = styled.div`
  height: 40px;
  width: 100%;
  margin: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: ${(props) => props.theme.top0};
  svg {
    max-height: 26px;
  }
`
