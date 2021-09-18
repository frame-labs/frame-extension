import { keyframes } from 'styled-components'

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

export const float = keyframes`
  0% {
    transform translate3d(0px, 0px, 0) rotate(-0.4deg) scale(1);
  }
  25% {
    transform translate3d(-0.7px, -1px, 0) rotate(0.4deg) scale(1.01);
  }
  50% {
    transform translate3d(0.7px, 1px, 0) rotate(-0.4deg) scale(1.02);
  }
  75% {
    transform translate3d(-0.7px, 0.3px, 0) rotate(0.2deg) scale(1.01);
  }
  100% {
    transform translate3d(0.7px, 0.7px, 0) rotate(-0.4deg) scale(1);
  }
`

export const shake = keyframes`
  2% {
    transform: translate(0px, 0px) rotate(0.5deg);
  }
  4% {
    transform: translate(0px, 1px) rotate(0.5deg);
  }
  6% {
    transform: translate(1px, 0px) rotate(0.5deg);
  }
  8% {
    transform: translate(1px, 1px) rotate(0.5deg);
  }
  10% {
    transform: translate(0px, 1px) rotate(0.5deg);
  }
  12% {
    transform: translate(1px, 0px) rotate(0.5deg);
  }
  14% {
    transform: translate(1px, 1px) rotate(0.5deg);
  }
  16% {
    transform: translate(0px, 1px) rotate(0.5deg);
  }
  18% {
    transform: translate(1px, 0px) rotate(0.5deg);
  }
  20% {
    transform: translate(1px, 0px) rotate(0.5deg);
  }
  22% {
    transform: translate(0px, 1px) rotate(0.5deg);
  }
  24% {
    transform: translate(0px, 0px) rotate(0.5deg);
  }
  26% {
    transform: translate(0px, 1px) rotate(0.5deg);
  }
  28% {
    transform: translate(0px, 1px) rotate(0.5deg);
  }
  30% {
    transform: translate(1px, 1px) rotate(0.5deg);
  }
  32% {
    transform: translate(0px, 1px) rotate(0.5deg);
  }
  34% {
    transform: translate(1px, 0px) rotate(0.5deg);
  }
  36% {
    transform: translate(1px, 0px) rotate(0.5deg);
  }
  38% {
    transform: translate(0px, 1px) rotate(0.5deg);
  }
  40% {
    transform: translate(0px, 1px) rotate(0.5deg);
  }
  42% {
    transform: translate(0px, 1px) rotate(0.5deg);
  }
  44% {
    transform: translate(0px, 1px) rotate(0.5deg);
  }
  46% {
    transform: translate(0px, 0px) rotate(0.5deg);
  }
  48% {
    transform: translate(1px, 0px) rotate(0.5deg);
  }
  50% {
    transform: translate(1px, 1px) rotate(0.5deg);
  }
  52% {
    transform: translate(1px, 0px) rotate(0.5deg);
  }
  54% {
    transform: translate(1px, 1px) rotate(0.5deg);
  }
  56% {
    transform: translate(0px, 0px) rotate(0.5deg);
  }
  58% {
    transform: translate(1px, 0px) rotate(0.5deg);
  }
  60% {
    transform: translate(1px, 1px) rotate(0.5deg);
  }
  62% {
    transform: translate(0px, 0px) rotate(0.5deg);
  }
  64% {
    transform: translate(1px, 1px) rotate(0.5deg);
  }
  66% {
    transform: translate(0px, 1px) rotate(0.5deg);
  }
  68% {
    transform: translate(1px, 1px) rotate(0.5deg);
  }
  70% {
    transform: translate(0px, 1px) rotate(0.5deg);
  }
  72% {
    transform: translate(1px, 0px) rotate(0.5deg);
  }
  74% {
    transform: translate(0px, 0px) rotate(0.5deg);
  }
  76% {
    transform: translate(1px, 0px) rotate(0.5deg);
  }
  78% {
    transform: translate(0px, 0px) rotate(0.5deg);
  }
  80% {
    transform: translate(1px, 1px) rotate(0.5deg);
  }
  82% {
    transform: translate(0px, 0px) rotate(0.5deg);
  }
  84% {
    transform: translate(0px, 1px) rotate(0.5deg);
  }
  86% {
    transform: translate(1px, 0px) rotate(0.5deg);
  }
  88% {
    transform: translate(0px, 0px) rotate(0.5deg);
  }
  90% {
    transform: translate(1px, 1px) rotate(0.5deg);
  }
  92% {
    transform: translate(1px, 0px) rotate(0.5deg);
  }
  94% {
    transform: translate(1px, 1px) rotate(0.5deg);
  }
  96% {
    transform: translate(0px, 1px) rotate(0.5deg);
  }
  98% {
    transform: translate(1px, 0px) rotate(0.5deg);
  }
  0%, 100% {
    transform: translate(0, 0) rotate(0);
  }
` 

export const rotate = keyframes`
  100% {
    transform: rotate(360deg);
  }
`

export const dash = keyframes`
  0% {
    stroke-dasharray: 1, 150;
    stroke-dashoffset: 0;
  }
  50% {
    stroke-dasharray: 90, 150;
    stroke-dashoffset: -35;
  }
  100% {
    stroke-dasharray: 90, 150;
    stroke-dashoffset: -124;
  }
`