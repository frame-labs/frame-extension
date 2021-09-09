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
  animation: ${cardShow} 600ms linear both;
  overscroll-behavior: contain;
  color: ${props => props.theme.top0};
`

const CollectionSummary = styled.div`
`

const CollectionSummaryTitle = styled.div`
  width: 100%;
  height: 48px;
  font-size: 12px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: 600;
`

const CollectionSummaryImage = styled.div`
  width: 96px;
  height: 96px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: 600;
  border-radius: 6px;
  overflow: hidden;
  background: ${props => props.theme.base1};

  img {
    width: 96px;
    height: 96px;
    object-fit: cover;
  }
`

class RightPanel extends React.Component {
  constructor (...args) {
    super(...args)
    this.state = {}
  }
  render () {
    const rightPanel = this.store('rightPanel')
    console.log(rightPanel)
    return rightPanel ? (
      <PopRight key={rightPanel}>
        <CollectionSummary>
          <CollectionSummaryTitle>
            {rightPanel.meta.name}
          </CollectionSummaryTitle>
          <CollectionSummaryImage>
            <img src={rightPanel.meta.img} />
          </CollectionSummaryImage>
          <div>
            {Object.keys(rightPanel.assets).length + ' items'}
          </div>
        </CollectionSummary>
      </PopRight>
    ) : null
  }
}

export default Restore.connect(RightPanel)