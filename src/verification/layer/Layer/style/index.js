import styled, { keyframes } from 'styled-components'

export const cardShow = keyframes`
  0% { 
    opacity: 0; 
  }
  15.82% { 
    opacity: 0; 
    transform: matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, -9.026, 0, 0, 1); 
  }
  21.02% { 
    transform: matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, -19.292, 0, 0, 1); 
  }
  35.34% {
    transform: matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, -3.681, 0, 0, 1);
  }
  49.55% {
    opacity: 1;
    transform: matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 2.594, 0, 0, 1); 
  }
  78.18% {
    transform: matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, -0.018, 0, 0, 1); 
  }
  100% {
    transform: matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);
  }
`