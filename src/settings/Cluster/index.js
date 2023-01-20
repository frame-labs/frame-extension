import React from 'react'
import styled, { css } from 'styled-components'

export const ClusterBoxMain = styled.div`
  position: relative;
  z-index: 100001;
  border-radius: 26px;
  overflow: hidden;
  box-shadow: 0px 4px 8px var(--ghostY), 0px 2px 8px var(--ghostY);
  border-bottom: 2px solid var(--ghostZ);
  padding: 0;
  text-align: center;
  margin: 6px;
  box-sizing: border-box;
  background: var(--ghostAZ);

  * {
    user-select: none;
  }
`

export const ClusterBoxLabel = styled.div`
  position: relative;
  font-size: 16px;
  padding: 16px 0px 8px 0px;
  font-family: 'MainFont';
  font-weight: 400;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--moon);
  svg {
    position: relative;
    top: -1px;
    height: 16px;
    margin-right: 12px;
  }
`

export const Cluster = styled.div`
  font-size: 17px;
  font-weight: 400;
  border-radius: 20px;
  -webkit-app-region: no-drag;
  transition: none;
  transform: translate3d(0, 0, 0);
  font-family: 'MainFont';
  display: flow-root;
  background: var(--ghostZ);
  margin: 6px;
  padding: 2px 0px 1px 0px;
`

export const ClusterValue = styled.div`
  flex-grow: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 12px;
  margin-right: 3px;
  font-size: 14px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 8px;
  -webkit-app-region: no-drag;
  transition: all linear 0.1s;
  transform: translate3d(0, 0, 0);
  font-family: 'MainFont';
  background: var(--ghostA);
  box-shadow: 0px 1px 2px var(--ghostX);
  border-bottom: 2px solid var(--ghostZ);
  overflow: hidden;
  margin-top: 1px;

  ${(props) => {
    return props.pointerEvents
      ? css`
          * {
            pointer-events: auto;
          }
        `
      : css`
          * {
            pointer-events: none;
          }
        `
  }}

  ${(props) => {
    return (
      (props.onClick || props.pointerEvents) &&
      css`
        cursor: pointer;
        margin-bottom: 0px;
        position: relative;
        z-index: 3;

        &:hover {
          background: var(--ghostB);
          transform: translateY(-1px);
          border-bottom: 2px solid var(--ghostZ);
          box-shadow: 0px 4px 30px -8px var(--ghostX);
          position: relative;
          z-index: 300000;
        }

        &:active {
          background: var(--ghostB);
          transform: translateY(0px);
          box-shadow: 0px 2px 4px var(--ghostX);
        }
      `
    )
  }}

  ${(props) => {
    return (
      props.transparent &&
      css`
        background: transparent;
        box-shadow: none;
        border-bottom: 2px solid transparent;
      `
    )
  }}
`

export const ClusterInputLabel = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  width: 60px;
  display: flex;
  justify-content: center;
  align-items: center;
`

export const ClusterColumn = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  font-size: 14px;
  align-items: stretch;

  ${ClusterValue} {
    border-radius: 8px;
  }

  &:first-child {
    > ${ClusterValue} {
      border-radius: 8px;
    }
    > ${ClusterValue}:first-child {
      border-top-left-radius: 18px;
    }
  }
  &:last-child {
    > ${ClusterValue} {
      border-radius: 8px;
    }
    > ${ClusterValue}:first-child {
      border-top-right-radius: 18px;
    }
  }
`

export const ClusterRow = styled.div`
  display: flex;
  justify-content: center;
  align-items: stretch;
  font-weight: 300;
  margin-left: 3px;
  &:first-child {
    > ${ClusterValue} {
      border-radius: 8px;
    }
    > ${ClusterValue}:first-child {
      border-top-left-radius: 18px;
    }
    > ${ClusterValue}:last-child {
      border-top-right-radius: 18px;
    }
  }
  &:last-child {
    > ${ClusterValue} {
      border-radius: 8px;
    }
    > ${ClusterValue}:first-child {
      border-bottom-left-radius: 18px;
    }
    > ${ClusterValue}:last-child {
      border-bottom-right-radius: 18px;
    }
    ${ClusterColumn}:first-child {
      > ${ClusterValue} {
        border-radius: 8px;
      }
      > ${ClusterValue}:first-child {
        border-top-left-radius: 18px;
      }
      > ${ClusterValue}:last-child {
        border-bottom-left-radius: 18px;
      }
      > ${ClusterValue}:first-child:last-child {
        border-top-left-radius: 18px;
        border-bottom-left-radius: 18px;
      }
    }
    ${ClusterColumn}:last-child {
      > ${ClusterValue} {
        border-radius: 8px;
      }
      > ${ClusterValue}:first-child {
        border-top-right-radius: 18px;
      }
      > ${ClusterValue}:last-child {
        border-bottom-right-radius: 18px;
      }
      > ${ClusterValue}:first-child:last-child {
        border-top-right-radius: 18px;
        border-bottom-right-radius: 18px;
      }
    }
  }
`
export const ClusterTag = styled.div`
  text-transform: uppercase;
  font-size: 11px;
  font-weight: 500;
  padding: 8px;
  text-align: center;
`

export const ClusterFocus = styled.div`
  text-transform: uppercase;
  font-size: 13px;
  line-height: 20px;
  font-weight: 500;
  padding: 16px 8px;
  text-align: center;
`

export const ClusterFocusHighlight = styled.div`
  font-size: 16px;
  color: var(--good);
`

export const ClusterAddress = styled.div`
  padding: 12px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
`

export const ClusterAddressRecipient = styled.div`
  font-size: 16px;
  font-weight: 300;
  font-family: 'FiraCode';
  display: flex;
  justify-content: center;
  align-items: center;
  pointer-events: none;
  svg {
    padding: 0px 4px !important;
  }
`

export const ClusterAddressRecipientFull = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  padding-bottom: 1px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  z-index: 40000;
  border-radius: 8px;
  font-weight: 500;
  background: var(--ghostB);
  opacity: 0;
  z-index: 4;
  box-shadow: 0px 4px 4px var(--ghostZ);
  transition: 0.05s linear all;
  &:hover {
    opacity: 1;
    transform: translateX(0px) scale(1);
  }
`
export const ClusterFira = styled.div`
  position: relative;
  top: 1.5px;
  left: 1px;
  font-weight: 300;
  font-size: 13px;
  font-family: 'FiraCode';
`
