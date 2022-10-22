/* globals chrome */

import React from 'react'
import Restore from 'react-restore'
import ReactDOM from 'react-dom'
import styled from 'styled-components'

const initialState = {
  frameConnected: false,
  appearAsMM: false,
  augmentOff: false
}

const actions = {
  setChains: (u, chains) => {
    u('availableChains', () => chains)
  },
  setCurrentChain: (u, chain) => {
    u('currentChain', () => chain)
  },
  setFrameConnected: (u, connected) => {
    u('frameConnected', () => connected)
  }
}

const store = Restore.create(initialState, actions)

const getScrollBarWidth = () => {
  if (typeof document === 'undefined') return 0
  const inner = document.createElement('p')
  inner.style.width = '100%'
  inner.style.height = '200px'
  const outer = document.createElement('div')
  outer.style.position = 'absolute'
  outer.style.top = '0px'
  outer.style.left = '0px'
  outer.style.visibility = 'hidden'
  outer.style.width = '200px'
  outer.style.height = '150px'
  outer.style.overflow = 'hidden'
  outer.appendChild(inner)
  document.body.appendChild(outer)
  var w1 = inner.offsetWidth
  outer.style.overflow = 'scroll'
  var w2 = inner.offsetWidth
  if (w1 == w2) w2 = outer.clientWidth
  document.body.removeChild(outer)
  return w1 - w2
}


function mmAppearToggle () {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    if (tabs[0]) {
      chrome.tabs.executeScript(tabs[0].id, { code: 'localStorage[\'__frameAppearAsMM__\']' }, (results) => {
        let mmAppear = false
        if (results) {
          try {
            mmAppear = JSON.parse(results[0])
          } catch (e) {
            mmAppear = false
          }
          chrome.tabs.executeScript(tabs[0].id, { code: `localStorage.setItem('__frameAppearAsMM__', ${JSON.stringify(!mmAppear)}); window.location.reload();` })
        }
        window.close()
      })
    }
  })
}


function augmentOffToggle () {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    if (tabs[0]) {
      chrome.tabs.executeScript(tabs[0].id, { code: 'localStorage[\'__frameAugmentOff__\']' }, (results) => {
        let augmentOff = true
        if (results) {
          try {
            augmentOff = Boolean(JSON.parse(results[0]))
          } catch (e) {
            augmentOff = true
          }
          chrome.tabs.executeScript(tabs[0].id, { code: `localStorage.setItem('__frameAugmentOff__', ${JSON.stringify(!augmentOff)}); window.location.reload();` })
        }
        window.close()
      })
    }
  })
}

const getOrigin = url => {
  const path = url.split('/')
  return path[0] + '//' + path[2]
}

const SettingsScroll = styled.div`
  overflow-x: hidden;
  overflow-y: scroll;
  box-sizing: border-box;
  max-height: 600px;
  margin-right: -${(props) => props.scrollBar || 0}px;
`

const SettingsWrap = styled.div`
  text-align: center;
  background: var(--ghostZ);
  border-radius: 16px;
  margin: 10px 8px 10px 8px;
  box-shadow: 0px 4px 8px var(--ghostX);
  box-sizing: border-box;
  padding-bottom: 8px;

  img {
    margin: 16px 0px 0px 0px;
    height: 32px;
    width: 32px;
  }
  
  * {
    user-select: none;
  }
`

const AugmentValue = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 64px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 12px;
  padding-left: 1px;
  letter-spacing: 1px;
  font-weight: 600;
`

const AugmentState = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  width: 75px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 14px;
  background: var(--ghostA);
`

const AugmentStateOn = styled(AugmentState)`
  color: var(--good);
`

const AugmentStateOff = styled(AugmentState)`
  color: var(--bad);
`

const AugmentWrap = styled.div`
  background: var(--ghostY);
  padding: 8px;
  margin: 0px 8px 0px 8px;
  width: calc(100% - 32px);
  border-radius: 8px;
  position: relative;
`

const Augment = styled.div`
  position: relative;
  background: var(--ghostZ);
  height: 42px;
  border-radius: 4px;
  font-weight: 600;
  display: flex;
  justify-content: center;
  align-items: center;
  text-transform: uppercase;
  cursor: pointer;
  font-size: 12px;
  overflow: hidden;

  &:hover {
    background: var(--ghostA);
    ${AugmentState} {
      background: var(--ghostB);
    }
  }

  * {
    pointer-events: none;
  }
`

const FrameConnected = styled.div`
  padding: 0px 16px 0px 0px;
  font-size: 13px;
  text-transform: uppercase;
  font-weight: 600;
  letter-spacing: 1px;
  padding-left: 1px;
`

const FrameCheck = styled.div`
  height: 100%;
  width: 75px;
  display: flex;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;
  color: var(--good);
  padding: 0px 10px;

  svg {
    height: 20px;
  }
`

const SummonFrameButton = styled.div`
  width: 75px;
  height: 100%;
  background: var(--ghostA);
  display: flex;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;

  svg {
    height: 20px;
    transform: scaleX(-1);
  }
`

const SummonFrameWrap = styled.div`
  margin: 16px;
  padding: 8px;
  background: var(--ghostY);
  border-radius: 8px;
`

const SummonFrame = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-radius: 4px;
  height: 42px;
  background: var(--ghostZ);
  flex-shrink: 1;
  overflow: hidden;
  cursor: pointer;

  * {
    pointer-events: none;
  }

  &:hover {
    background: var(--ghostA);
    ${SummonFrameButton} {
      background: var(--ghostB);
      color: var(--good);
    }
  }
`

const TabOrigin = styled.div`
  color: var(--moon);
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  border-radius: 8px;
  height: 48px;
  font-weight: 400;
  margin: 0px 8px 8px 8px;
  font-size: 18px;
  background: var(--ghostY);

  * {
    pointer-events: none;
  }

  svg {
    position: relative;
    height: 14px;
    top: 2px;
    margin-right: 8px;
  }
`

const Appear = styled.div`
  background: var(--ghostZ);
  border-radius: 8px;
  width: 100%;
  background: var(--ghostY);
  margin: 0px 8px 0px 8px;
`

const AppearDescription = styled.div`
  font-weight: 600;
  text-transform: uppercase;
  font-size: 14px;
  padding-left: 1px;
  letter-spacing: 1px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding-left: 1px;
  letter-spacing: 1px;
  height: 42px;
  margin-top: 8px;

  svg {
    height: 16px;
    margin-right: 8px;
  }
`

const AppearToggle = styled.div`
  position: relative;
  background: var(--ghostZ);
  height: 42px;
  border-radius: 4px;
  font-weight: 600;
  display: flex;
  justify-content: center;
  align-items: center;
  text-transform: uppercase;
  cursor: pointer;
  font-size: 12px;
  margin: 8px;
  overflow: hidden;
  padding-left: 1px;
  letter-spacing: 1px;

  &:hover {
    background: var(--ghostA);
  }
`

const NotConnected = styled.div`
  padding: 32px 64px 16px 64px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 18px;
`

const Download = styled.a`
  background: var(--good);
  color: var(--goodOver);
  height: 50px;
  border-radius: 12px;
  font-weight: 700;
  display: flex;
  justify-content: center;
  align-items: center;
  text-transform: uppercase;
  margin: 16px;
  cursor: pointer;
  font-size: 17px;
  letter-spacing: 1px;
  padding-right: 1px;
  border: 8px solid var(--ghostY);

  &:hover {
    background: var(--goodUp);
    color: var(--goodOver);
  }

  * {
    pointer-events: none;
  }

  &:visited {
    color: var(--goodOver);
  }
`

const DappControls = styled.div`
  margin: 8px;
  border-radius: 12px;
  display: flex;
  flex-wrap: wrap;
  width: cale(100% - 16px);
`

const ChainSwitcher = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  background: var(--ghostY);
  margin: 0px 8px 8px 8px;
  border-radius: 8px;
  padding: 0px 0px 8px 8px;
`

const StyledChainButton = styled.div`
  position: relative; 
  width: calc(50% - 8px);
  display: flex;
  justify-content: center;
  align-items: center;
  height: 42px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
  font-weight: 600;
  box-sizing: border-box;
  background: var(--ghostZ);
  background: ${props => props.isSelected ? 'var(--ghostA)' : 'var(--ghostZ)'};
  color: ${props => props.isSelected ? 'var(--good)' : 'white'};
  margin: 8px 8px 0px 0px; 

  &:hover {
    background: var(--ghostA);
    color: var(--good);
  }

  * {
    pointer-events: none;
  }

  &:visited {
    color: var(--goodOver);
  }
`

const ChainButtonIcon = styled.div`
  position: absolute;
  top: 12px;
  left: 10px;
  width: 12px;
  height: 12px;
  background: ${(props) => props.isCurrentChain ? 'var(--good)' : 'var(--ghostY)'};
  border-radius 9px;
  border: solid 4px var(--ghostY);
`

const SectionHeader = styled.div`
  width: 100%;
  font-size: 9px;
  margin: 8px 16px 6px 16px;
  color: var(--outerspace);
  font-weight: 600;
  letter-spacing: 2px;
  text-align: left;
  text-transform: uppercase;
`

const Overlay = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0; 
  left: 0;
  background: linear-gradient(-35deg, var(--overlayA) 0%, var(--overlayB) 100%);
  z-index: 9999999999999;
  pointer-events: none;
`

const originDomainRegex = /^(?:.+(?::\/\/))?(?<origin>.*)/

function parseOrigin (origin) {
  const m = origin.match(originDomainRegex)
  if (!m) {
    log.warn(`could not parse origin: ${origin}`)
    return origin
  }

  return (m.groups || {}).origin || origin
}

const isFirefox = Boolean(window?.browser && browser?.runtime)

const ChainButton = ({ onClick, name, isSelected }) => 
  <StyledChainButton onClick={onClick} isSelected={isSelected}>
    <ChainButtonIcon isSelected={isSelected} />
    <div>{name}</div>
  </StyledChainButton>

class _Settings extends React.Component {
  notConnected() {
    return (
      <>
        <NotConnected>Frame is not currently running on your machine</NotConnected>
        <Download href='https://frame.sh' target='_newtab'>Download Frame</Download>
      </>
    )
  }

  frameConnected () {
    return (
      <SummonFrameWrap>
        <SummonFrame onClick={() => {
          chrome.runtime.sendMessage({ method: 'frame_summon', params: [] })
        }}>
          <FrameCheck>
            <svg viewBox='0 0 448 512'>
              <path fill='currentColor'  d='M438.6 105.4C451.1 117.9 451.1 138.1 438.6 150.6L182.6 406.6C170.1 419.1 149.9 419.1 137.4 406.6L9.372 278.6C-3.124 266.1-3.124 245.9 9.372 233.4C21.87 220.9 42.13 220.9 54.63 233.4L159.1 338.7L393.4 105.4C405.9 92.88 426.1 92.88 438.6 105.4H438.6z'/>
            </svg>
          </FrameCheck>
          <FrameConnected>Frame Connected</FrameConnected>
          <SummonFrameButton>
            <svg viewBox='0 0 512 512'>
              <path fill='currentColor'  d='M416 32h-64c-17.67 0-32 14.33-32 32s14.33 32 32 32h64c17.67 0 32 14.33 32 32v256c0 17.67-14.33 32-32 32h-64c-17.67 0-32 14.33-32 32s14.33 32 32 32h64c53.02 0 96-42.98 96-96V128C512 74.98 469 32 416 32zM342.6 233.4l-128-128c-12.51-12.51-32.76-12.49-45.25 0c-12.5 12.5-12.5 32.75 0 45.25L242.8 224H32C14.31 224 0 238.3 0 256s14.31 32 32 32h210.8l-73.38 73.38c-12.5 12.5-12.5 32.75 0 45.25s32.75 12.5 45.25 0l128-128C355.1 266.1 355.1 245.9 342.6 233.4z'/>
            </svg>
          </SummonFrameButton>
        </SummonFrame>
      </SummonFrameWrap>
    )
  }

  appearAsMMToggle () {
    return this.props.mmAppear 
      ? (
          <Appear>
            <AppearDescription>
              <svg viewBox='0 0 576 512'>
                <path fill='var(--mm)' d='M288 64C39.52 64 0 182.1 0 273.5C0 379.5 78.8 448 176 448c27.33 0 51.21-6.516 66.11-36.79l19.93-40.5C268.3 358.6 278.1 352.4 288 352.1c9.9 .3711 19.7 6.501 25.97 18.63l19.93 40.5C348.8 441.5 372.7 448 400 448c97.2 0 176-68.51 176-174.5C576 182.1 536.5 64 288 64zM160 320c-35.35 0-64-28.65-64-64s28.65-64 64-64c35.35 0 64 28.65 64 64S195.3 320 160 320zM416 320c-35.35 0-64-28.65-64-64s28.65-64 64-64c35.35 0 64 28.65 64 64S451.3 320 416 320z'/>
              </svg>
              <span>Injecting as <span className='mm'>Metamask</span></span>
            </AppearDescription>
            <AppearToggle onClick={() => mmAppearToggle()}>
              <span>Appear As <span className='frame'>Frame</span> Instead</span>
            </AppearToggle>
          </Appear>
        )
      : (
          <Appear>
            <AppearDescription>
              <svg viewBox='0 0 448 512'>
                <path fill='var(--good)' d='M176 448C167.3 448 160 455.3 160 464V512h32v-48C192 455.3 184.8 448 176 448zM272 448c-8.75 0-16 7.25-16 16s7.25 16 16 16s16-7.25 16-16S280.8 448 272 448zM164 172l8.205 24.62c1.215 3.645 6.375 3.645 7.59 0L188 172l24.62-8.203c3.646-1.219 3.646-6.375 0-7.594L188 148L179.8 123.4c-1.215-3.648-6.375-3.648-7.59 0L164 148L139.4 156.2c-3.646 1.219-3.646 6.375 0 7.594L164 172zM336.1 315.4C304 338.6 265.1 352 224 352s-80.03-13.43-112.1-36.59C46.55 340.2 0 403.3 0 477.3C0 496.5 15.52 512 34.66 512H128v-64c0-17.75 14.25-32 32-32h128c17.75 0 32 14.25 32 32v64h93.34C432.5 512 448 496.5 448 477.3C448 403.3 401.5 340.2 336.1 315.4zM64 224h13.5C102.3 280.5 158.4 320 224 320s121.8-39.5 146.5-96H384c8.75 0 16-7.25 16-16v-96C400 103.3 392.8 96 384 96h-13.5C345.8 39.5 289.6 0 224 0S102.3 39.5 77.5 96H64C55.25 96 48 103.3 48 112v96C48 216.8 55.25 224 64 224zM104 136C104 113.9 125.5 96 152 96h144c26.5 0 48 17.88 48 40V160c0 53-43 96-96 96h-48c-53 0-96-43-96-96V136z'/>
              </svg>
                <span>Injecting as <span className='frame'>Frame</span></span>
            </AppearDescription>
            <AppearToggle onClick={() => mmAppearToggle()}>
              <span>Appear As <span className='mm'>Metamask</span> Instead</span>
            </AppearToggle>
          </Appear>
        )
  }

  chainButton (chainId, name) {
    const currentChain = this.store('currentChain')
    const isCurrentChain = chainId === parseInt(currentChain, 16)

    return <ChainButton
      onClick={() => {
        chrome.runtime.sendMessage({
          tab: this.props.tab, 
          method: 'wallet_switchEthereumChain', 
          params: [{ chainId }] 
        })
        updateCurrentChain(this.props.tab)
      }}
      isSelected={isCurrentChain}
      name={name}
    />
  }

  chainSelect () {
    const chains = this.store('availableChains') || []

    return (
      <ChainSwitcher>
        {chains.map(({ chainId, name }) => this.chainButton(chainId, name))}
      </ChainSwitcher>
    )
  }

  currentChain () {
    try {
      const availableChains = this.store('availableChains')
      const currentChain = this.store('currentChain')
      const currentChainDetails = availableChains.find(({ chainId }) => chainId === currentChain)
      if (currentChainDetails && currentChainDetails.name) {
        return currentChainDetails.name
      } else {
        const chainInt = parseInt(currentChain)
        if (isNaN(chainInt)) {
          return '?'
        } else {
          return chainInt
        }
      }
    } catch (e) {
      return '?'
    }
  }

  render () {
    const isConnected = this.store('frameConnected')
    const origin = parseOrigin(getOrigin(this.props.tab.url))

    const currentChain = this.currentChain()

    const mainPanel = isConnected
      ? (
          <>
            <Overlay />
            {this.frameConnected()}
            <DappControls>
              <TabOrigin>
                <svg viewBox='0 0 512 512'>
                  <path fill='var(--moon)' d='M448 32C483.3 32 512 60.65 512 96V416C512 451.3 483.3 480 448 480H64C28.65 480 0 451.3 0 416V96C0 60.65 28.65 32 64 32H448zM96 96C78.33 96 64 110.3 64 128C64 145.7 78.33 160 96 160H416C433.7 160 448 145.7 448 128C448 110.3 433.7 96 416 96H96z'/>
                </svg>
                {origin}
              </TabOrigin>
              {this.store('availableChains').length ? (
                <>
                  <SectionHeader>{'ON CHAIN: ' + currentChain}</SectionHeader>
                  {this.chainSelect()}
                </>
              ) : null}
              <SectionHeader>{'APPEAR AS: ' + (this.props.mmAppear ? 'METAMASK' : 'FRAME')}</SectionHeader>
              {this.appearAsMMToggle()}
              {origin === 'twitter.com' && !isFirefox ? (
                <div style={{ marginTop: '8px', width: '100%' }}>
                  <SectionHeader>{'VERIFY ENS: ' + (this.props.augmentOff ? 'OFF' : 'ON')}</SectionHeader>
                  {this.props.augmentOff ? (
                    <AugmentWrap>
                      <Augment onClick={() => augmentOffToggle()}>
                        <AugmentValue>Verify ENS Names</AugmentValue>
                        <AugmentStateOff>OFF</AugmentStateOff>
                      </Augment>
                    </AugmentWrap>
                  ) : (
                    <AugmentWrap>
                      <Augment onClick={() => augmentOffToggle()}>
                        <AugmentValue>Verify ENS Names</AugmentValue>
                        <AugmentStateOn>ON</AugmentStateOn>
                      </Augment>
                    </AugmentWrap>
                  )}
                </div>
              ) : null}
            </DappControls>
          </>
        )
      : this.notConnected()
    return (
      <SettingsScroll scrollBar={getScrollBarWidth()}>
        <SettingsWrap>
          <img src='FrameLogo.png' />
          {mainPanel}
        </SettingsWrap>
      </SettingsScroll>
    )
  }
}

const Settings = Restore.connect(_Settings, store)

const frameConnect = chrome.runtime.connect({ name: 'frame_connect' })

frameConnect.onMessage.addListener(state => {
  store.setFrameConnected(state.connected)
  store.setChains(state.availableChains)
  store.setCurrentChain(state.currentChain)
})

const updateCurrentChain = (tab) => {
  chrome.tabs.sendMessage(tab.id, { 
    type: 'embedded:action',
    action: { type: 'getChainId' }
  })
}

document.addEventListener('DOMContentLoaded', function () {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    setInterval(() => {
      updateCurrentChain(tabs[0])
    }, 1000)
    chrome.tabs.executeScript(tabs[0].id, { code: 'localStorage[\'__frameAppearAsMM__\']' }, (results) => {
      let mmAppear = false
      if (results) {
        try {
          mmAppear = JSON.parse(results[0])
        } catch (e) {
          mmAppear = false
        }
      }
      chrome.tabs.executeScript(tabs[0].id, { code: 'localStorage[\'__frameAugmentOff__\']' }, (results) => {
        let augmentOff = false
        if (results) {
          try {
            augmentOff = JSON.parse(results[0])
          } catch (e) {
            augmentOff = false
          }
        }

        const root = document.getElementById('root')

        ReactDOM.render(<Settings 
          tab={tabs[0]}
          mmAppear={mmAppear}
          augmentOff={augmentOff}
        />, root)
      })
    })
  })
})
