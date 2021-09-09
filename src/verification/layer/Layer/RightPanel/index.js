import React from 'react'
import Restore from 'react-restore'
import styled, { keyframes, ThemeProvider } from 'styled-components'

import { cardShow } from '../style'

const PopRight = styled.div`
  position: absolute;
  top: 0;
  right: 0px;
  bottom: 0;
  width: 190px;
  z-index: 200;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  animation: ${cardShow} 400ms linear both;
  overscroll-behavior: contain;
  color: ${props => props.theme.top0};
`

const PopRightLogo = styled(PopRight)`
  svg {
    height: 80px;
    fill: ${props => props.theme.base2};
    opacity: 0.2;
  }
`

const CollectionSummary = styled.div`
`

const CollectionSummaryTitle = styled.div`
  width: 100%;
  font-size: 11px;
  text-align: center;
  font-weight: 600;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  max-width: 100%;
  box-sizing: border-box;
  padding: 0px 8px 5px 8px;
`

const CollectionSummaryImage = styled.div`
  width: 112px;
  height: 112px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: 600;
  border-radius: 8px;
  overflow: hidden;
  background: ${props => props.theme.base1};
  text-align: center;
  padding: 16px;

  img {
    width: 96px;
    height: 96px;
    object-fit: cover;
    border-radius: 2px;
  }
`

const CollectionItemCount = styled.div`
  width: 100%;
  height: 48px;
  font-size: 9px;
  letter-spacing: 1px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-weight: 600;
  text-transform: uppercase;
  position: relative;
`

const CollectionItemCountNumber = styled.div`
  font-size: 20px;
  font-weight: 400;
  text-transform: uppercase;
  margin: 5px 0px 3px 0px;
  height: 44px;
  border-radius: 8px;
  padding: 0px 8px;
  min-width 60px;
  display: flex;
  justify-content: center;
  align-items: center;
  background: ${props => props.theme.base1};
`

class RightPanel extends React.Component {
  constructor (...args) {
    super(...args)
    this.state = {}
  }
  render () {
    const rightPanel = this.store('rightPanel')

    const defaultPayload = {
      name: 'default',
      img: 'image',

    }
    const count = rightPanel ? Object.keys(rightPanel.assets).length : 0
    return (
      <>
        <PopRightLogo key='logo'>
          <svg viewBox="0 0 245 247">
            <path d="M232,124V46.82A33.82,33.82,0,0,0,198.18,13H123L110,0H36.94A36.94,36.94,0,0,0,0,36.94V111l13,13v76.18A33.82,33.82,0,0,0,46.82,234H123l13,13h72.06A36.94,36.94,0,0,0,245,210.06V137Zm-58,29.41A22.6,22.6,0,0,1,151.41,176H93.59A22.6,22.6,0,0,1,71,153.41V93.59A22.6,22.6,0,0,1,93.59,71h57.82A22.6,22.6,0,0,1,174,93.59Z"/>
          </svg>
        </PopRightLogo>
        {rightPanel ? (
          <PopRight key={rightPanel}>
            <CollectionSummaryTitle>
              {rightPanel.meta.name}
            </CollectionSummaryTitle>
            <CollectionSummaryImage>
             {rightPanel.meta.img ? <img src={rightPanel.meta.img} /> : rightPanel.meta.name}
            </CollectionSummaryImage>
            <CollectionItemCount>
              <CollectionItemCountNumber>
                {count}
              </CollectionItemCountNumber>
              <div>{count === 1 ? 'item' : 'items'}</div>
            </CollectionItemCount>
          </PopRight>
        ) : null}
      </>
    )
  }
}

export default Restore.connect(RightPanel)