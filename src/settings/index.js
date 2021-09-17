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
  setFrameConnected: (u, connected) => {
    u('frameConnected', () => connected)
  }
}

const store = Restore.create(initialState, actions)

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

const SettingsWrap = styled.div`
  text-align: center;
  background: var(--ghostA);
  border-radius: 10px;
  overflow: hidden;

  img {
    margin: 24px 0px 18px 0px;
    height: 30px;
    width: 30px;
  }
`

const Augment = styled.div`
  background: var(--ghostA);
  // color: var(--good);
  height: 32px;
  border-radius: 8px;
  font-weight: 600;
  display: flex;
  justify-content: center;
  align-items: center;
  text-transform: uppercase;
  margin: 16px;
  cursor: pointer;
  font-size: 11px;
  border: 1px solid var(--ghostZ);
  padding-bottom: 1px;

  &:hover {
    background: var(--ghostB);
  }

  * {
    pointer-events: none;
  }
`

const FrameConnected = styled.div`
  padding: 0px 20px 0px 30px;
  font-size: 13px;
  text-transform: uppercase;
  font-weight: 600;
  user-select: none;
`

const SummonFrameFrameWrap = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`

const SummonFrameButton = styled.div`
  width: 56px;
  height: 32px;
  background: var(--ghostC);
  display: flex;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;
  padding-right: 3px;

  svg {
    height: 24px;
  }
`

const SummonFrame = styled.div`
  display: inline-flex;
  justify-content: center;
  align-items: center;
  border-radius: 16px;
  height: 32px;
  background: var(--ghostB);
  box-shadow: 0px 6px 12px -6px var(--ghostX);
  flex-shrink: 1;
  overflow: hidden;
  cursor: pointer;

  * {
    pointer-events: none;
  }

  &:hover {
    background: var(--ghostC);
    ${SummonFrameButton} {
      background: var(--good);
      color: var(--goodOver);
    }
    ${FrameConnected} {
      color: var(--good);
    }
  }

`

const TabOrigin = styled.div`
  margin-top: 5px;
  font-weight: 600;
  font-size: 11px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  background: var(--ghostZ);
  height: 32px;
  display: flex;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;
`

const Appear = styled.div`
  margin-top: 16px;
  background: var(--ghostZ);
  margin: 16px;
  border-radius: 10px;
  padding: 1px;
`

const AppearDescription = styled.div`
  margin: 16px;
  font-weight: 600;
  text-transform: uppercase;
  font-size: 15px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding-left: 1px;
  letter-spacing: 1px;
`

const AppearToggle = styled.div`
  width: 100%;
  height: 32px;
  background: var(--ghostA);
  border-radius: 8px;
  color: var(--outerspace);
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: 400;
  font-size: 13px;
  cursor: pointer;
  box-sizing: border-box;
  text-transform: uppercase;
  outline: 0;
  border: 0;
  margin-top: 10px;
  letter-spacing: 1px;

  &:hover {
    background: var(--ghostB);
  }
`


const NotConnected = styled.div`
  padding: 0px 50px;
  font-size: 18px;
`

const Download = styled.a`
  background: var(--goodUp);
  color: var(--goodOver);
  height: 42px;
  border-radius: 8px;
  font-weight: 600;
  display: flex;
  justify-content: center;
  align-items: center;
  text-transform: uppercase;
  margin: 16px;
  cursor: pointer;
  font-size: 15px;
  border: 1px solid var(--ghostZ);

  &:hover {
    background: rgb(0, 255, 235);
    color: var(--goodOver);
  }

  * {
    pointer-events: none;
  }

  &:visited {
    color: var(--goodOver);
  }

`

class _Settings extends React.Component {
  frameConnected () {
    const frameConnected = this.store('frameConnected')
    if (frameConnected) {
      return (
        <>
          <SummonFrameFrameWrap>
            <SummonFrame onClick={() => {
                chrome.runtime.sendMessage({ jsonrpc: '2.0', id: 1, method: 'frame_summon', params: [] })
              }}>
              <FrameConnected>Connected to Frame</FrameConnected>
              <SummonFrameButton>
                <svg viewBox='0 0 24 24' width='24' height='24'>
                  <path fill='currentColor' d='M3 3.25c0-.966.784-1.75 1.75-1.75h5.5a.75.75 0 010 1.5h-5.5a.25.25 0 00-.25.25v17.5c0 .138.112.25.25.25h5.5a.75.75 0 010 1.5h-5.5A1.75 1.75 0 013 20.75V3.25zm9.994 9.5l3.3 3.484a.75.75 0 01-1.088 1.032l-4.5-4.75a.75.75 0 010-1.032l4.5-4.75a.75.75 0 011.088 1.032l-3.3 3.484h8.256a.75.75 0 010 1.5h-8.256z' />
                </svg>
            </SummonFrameButton>
            </SummonFrame>
          </SummonFrameFrameWrap>
          {this.props.mmAppear ? (
            <Appear>
              <AppearDescription>
                <span>Injecting as <span className='mm'>Metamask</span></span>
              </AppearDescription>
              <AppearToggle onClick={() => mmAppearToggle()}>
                <span>Appear As <span className='frame'>Frame</span> Instead</span>
              </AppearToggle>
            </Appear>
          ) : (
            <Appear>
              <AppearDescription>
                  <span>Injecting as <span className='frame'>Frame</span></span>
              </AppearDescription>
              <AppearToggle onClick={() => mmAppearToggle()}>
                <span>Appear As <span className='mm'>Metamask</span> Instead</span>
              </AppearToggle>
            </Appear>
          )}
        </>
      )
    } else {
      return (
        <>
          <NotConnected>Frame is not currently running on your machine</NotConnected>
          <Download href='https://frame.sh' target='_newtab'>Click here to download Frame</Download>
        </>
      )
    }
  }
  render () {
    return (
      <SettingsWrap>
        <img src='FrameLogo.png' />
        {this.frameConnected()}
        {this.props.origin === 'https://twitter.com' ? (
          this.props.augmentOff ? (
            <Augment onClick={() => augmentOffToggle()}>
              <div>Twitter Badge: Off</div>
            </Augment>
          ) : (
            <Augment onClick={() => augmentOffToggle()}>
              <div>Twitter Badge: On</div>
            </Augment>
          )
        ) : null}
        <TabOrigin>{this.props.origin}</TabOrigin>
      </SettingsWrap>
    )
  }
}

const Settings = Restore.connect(_Settings, store)

const frameConnect = chrome.runtime.connect({ name: 'frame_connect' })

setInterval(() => {
  frameConnect.postMessage('frame_connected')
  frameConnect.onMessage.addListener(store.setFrameConnected)
}, 2000)

document.addEventListener('DOMContentLoaded', function () {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
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

        frameConnect.postMessage('frame_connected')
        frameConnect.onMessage.addListener(connected => {
          store.setFrameConnected(connected)

          const root = document.getElementById('root')

          ReactDOM.render(<Settings 
            origin={getOrigin(tabs[0].url)}
            mmAppear={mmAppear}
            augmentOff={augmentOff}
          />, root)

        })  
      })
    })
  })
})
