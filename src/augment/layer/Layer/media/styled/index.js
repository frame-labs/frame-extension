import styled from 'styled-components'
import { dash, rotate } from '../style'

export const LoadingSpinner = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  pointer-events: none;
  svg {
    animation: ${rotate} 2s linear infinite;
    z-index: 2;
    width: 26px;
    height: 26px;
    
    & circle {
      stroke: ${props => props.theme.top0};
      stroke-linecap: round;
      animation: ${dash} 1.5s ease-in-out infinite;
    }
  }
`