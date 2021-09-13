import React from 'react'
import Restore from 'react-restore'
import ReactDOM from 'react-dom'
import styled from 'styled-components'

import inventory from './inventory'
import store from './store'
import themes from './themes'
import n from 'nebula'

import './layer'

const nebula = n()

const firstChild = (element, count, i = 0) => {
  element = element.children[0]
  if (++i === count) return element
  return firstChild(element, count, i)
}

const root = document.getElementById('react-root')

const config = { childList: true, subtree: true }

const Container = styled.div`
  cursor: pointer;
  justify-content: center;
  align-items: center;
  pointer-events: none;
`

class Badge extends React.Component {
  constructor () {
    super()
    this.state = {
      showEthPanel: false
    }
  }
  badge (size) {
    const theme = store('theme')
    const { userId  } = this.props
    const user = userId ? this.store('users', userId) : ''
    let color, background
    if (user && user.verified.name) {
      color = theme.badge.verified.color
      background = theme.badge.verified.background
    } else if (user) {
      color = theme.badge.unverified.color
      background = theme.badge.unverified.background
    } else {
      color = theme.badge.default.color
      background = theme.badge.default.background
    }

    return (
      <svg style={{ height: `${size}px`, width: `${size}px` }}  viewBox='0 0 84 84'>
        <path fill={background} d='M84,44a16.1,16.1,0,0,0-8.59-14.4,16.63,16.63,0,0,0,1-5.6c0-8.84-6.84-16-15.27-16a14.2,14.2,0,0,0-5.34,1A15,15,0,0,0,28.26,9a14.45,14.45,0,0,0-5.35-1C14.47,8,7.64,15.16,7.64,24a16.63,16.63,0,0,0,1,5.6,16.38,16.38,0,0,0-.82,28.34A17.53,17.53,0,0,0,7.64,60c0,8.84,6.83,16,15.27,16a14.4,14.4,0,0,0,5.34-1,15,15,0,0,0,27.5,0,14.6,14.6,0,0,0,5.34,1c8.44,0,15.27-7.16,15.27-16a15.57,15.57,0,0,0-.13-2.05A16.16,16.16,0,0,0,84,44Z'/>
        <path fill={color} d='M60.08,39.1,43,16.13a1,1,0,0,0-1.77,0l-17.08,23a1,1,0,0,0,.35,1.4l17.08,8.69a1,1,0,0,0,1.08,0L59.74,40.5A1,1,0,0,0,60.08,39.1Zm-1.4,8.25L42.74,56.47a1.18,1.18,0,0,1-1.25,0L25.55,47.35A.41.41,0,0,0,25,48L41.14,68a1.19,1.19,0,0,0,2,0L59.21,48A.41.41,0,0,0,58.68,47.35Z'/>
      </svg>
    )
  }
  render () {
    return (
      <Container onClick={e => {
        e.preventDefault()
        e.stopPropagation()
      }}
      onMouseOver={e => {
        e.preventDefault()
        e.stopPropagation()
      }}
      onMouseEnter={e => {
        e.preventDefault()
        e.stopPropagation()
      }}
      onMouseLeave={e => {
        e.preventDefault()
        e.stopPropagation()
      }}>
        <div 
          style={{ pointerEvents: 'auto', paddingTop: '2px' }}
          onMouseOver={e => {
            e.preventDefault()
            e.stopPropagation()
            const pos = e.target.getBoundingClientRect()
            const position = { x: pos.x, y: pos.y }
            this.store.setLayerPop({ position, active: true, userId: this.props.userId, created: Date.now() })
          }
        }>
          {this.badge(16)}
        </div>
      </Container>
  )}
}

const insertAfter = (newNode, referenceNode) => {
  return referenceNode.parentNode.insertBefore(newNode, referenceNode)
}

const usersChecked = []

const callback = function (mutationsList, observer) {
  const composeTweet = document.querySelectorAll('[data-testid=SideNav_NewTweet_Button]')[0]
  const { backgroundColor } = window.getComputedStyle(document.body)
  let color = 'rgb(255, 255, 255)'
  if (backgroundColor === color) {
    if (composeTweet) {
      color = window.getComputedStyle(composeTweet).backgroundColor
      badgeColor = color
    } else {
      color = 'rgb(45, 45, 45)'
      badgeColor = 'rgb(45, 45, 45)'
      boxShadow = 'rgb(136 153 166 / 20%) 0px 0px 15px, rgb(136 153 166 / 15%) 0px 0px 3px 1px'
    }
  } 

  // TODO: Only update current style if something has changed
  // setTheme in store
  store.setTheme(themes(backgroundColor))

  const mouseBlocker = (mount) => {
    const blocker  = document.createElement('div')
    blocker.className = '__frameMountBlock__'
    blocker.style.cssText = `
      width: 4px;
      height: 20px;
      position: absolute;
      top: 0;
      left: 75px;
      pointer-events: auto;
    `
    mount.appendChild(blocker)
  }

  mutationsList.forEach(async mutation => {
    if (mutation.type === 'childList') {
      if (mutation.addedNodes.length > 0) {
        const addedNode = mutation.addedNodes[0]
        const tweet = addedNode.querySelector('[data-testid=tweet]')

        if (tweet) {
          const [avatar, nameSection] = tweet.querySelectorAll('a[role=link]')
          
          const nameBlocks = [...nameSection.querySelectorAll('span')]
          
          const handleHref = (nameSection || {}).href || ''
          const handle = (handleHref.split('/').reverse()[0] || '').toLowerCase()

          const ensNameBlock = nameBlocks.find(block => (block.textContent || '').includes('.eth'))
          const ensName = ((((ensNameBlock || {}).textContent || '').match(/[\w_\-\.]+.eth/) || [])[0] || '').toLowerCase()

          if (ensName) {
            const userId = ensName.replace(/\./g,'-')
            if (nameSection.querySelector('.__frameMount__')) return
            const mount  = document.createElement('div')
            mount.className = '__frameMount__'
            mount.style.cssText = `
              width: 16px;
              height: 20px;
              pointer-events: auto;
              display: inline-block;
              position: relative;
              vertical-align: -20%;
              margin-right: 4px;
              margin-left: -2px;
            `
            insertAfter(mount, firstChild(nameSection, 3))

            const ConnectedBadge = Restore.connect(Badge, store)
            ReactDOM.render(<ConnectedBadge userId={userId} />, mount)

            mouseBlocker(tweet)

            // If user has been scanned already
            if (usersChecked.includes(userId)) return
            usersChecked.push(userId)

            const { record } = await nebula.resolve(ensName)
            if (!record) return

            // Need to verify eth

            const user = {
              name: record.name || '',
              avatar: record.text && record.text.avatar ? record.text.avatar : '',
              address: record.addresses && record.addresses.eth ? record.addresses.eth.toLowerCase() : '',
              twitter: record.text && record.text['com.twitter'] ? record.text['com.twitter'] : ''
            }

            user.verified = {
              name: handle.toLowerCase() === user.twitter.toLowerCase(),
              avatar: false
            }
            const compatible = 'eip155:1/erc721:'
            const index = user.avatar.indexOf(compatible)
            const nftAvatar = index > -1
            if (nftAvatar) {
              const location = user.avatar.subsrt(index + compatible.length)
              const [contract, tokenId] = location.split('/')
              console.log('We have an NFT avatar', contract, tokenId)
            }

            user.inventory = await inventory(user.address)

            // Map and type media
            Object.keys(user.inventory).forEach(collection => {
              const { meta, assets } = user.inventory[collection]
              meta.priority = meta.img ? 1 : 0
              const img = meta.img ? meta.img : assets[Object.keys(assets).filter(k => assets[k].img).sort((a, b) => {
                if (assets[a].tokenId < assets[b].tokenId) return -1
                if (assets[a].tokenId > assets[b].tokenId) return 1
                return 0
              })[0]]?.img
              meta.img = { src: img || '' }
              meta.img.type = meta.img.src.endsWith('.mp4') || meta.img.src.endsWith('.mov') ? 'video' : 'img'

              Object.keys(assets).forEach(asset => {
                const { img, animation, thumbnail } = assets[asset]
                assets[asset].img = { src: animation || img || '' }
                assets[asset].img.type = assets[asset].img.src.endsWith('.mp4') || assets[asset].img.src.endsWith('.mov') ? 'video' : 'img'
                assets[asset].thumbnail = { src: thumbnail || animation || img || ''}
                assets[asset].thumbnail.type = assets[asset].thumbnail.src.endsWith('.mp4') || assets[asset].thumbnail.src.endsWith('.mov') ? 'video' : 'img'
              })
            })

            store.setUser(userId, user)
  
            // if (avatar.querySelector('.__frameMount2__')) return
            // const mount2  = document.createElement('div')
            // mount2.className = '__frameMount2__'
            // mount2.style.cssText = `
            //   position: absolute;
            //   top: 0px;
            //   left: 0;
            //   height: 48px;
            //   width: 48px;
            //   border-radius: 24px;
            //   pointer-events: auto;
            //   z-index: 2000;
            // `
            // avatar.appendChild(mount2)
            // ReactDOM.render(<PFP />, mount2)

          }
        }
      }
    }
  })
}

const observer = new MutationObserver(callback)

observer.observe(root, config)

// observer.disconnect()
