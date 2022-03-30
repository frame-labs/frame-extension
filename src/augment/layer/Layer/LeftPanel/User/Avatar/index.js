import React from 'react'
import Restore from 'react-restore'

import {
  PopAvatarImg,
  PopAvatar,
  PopAvatarMeta,
  PopAvatarMetaName,
  PopAvatarMetaCollection,
  PopAvatarMetaTokenNumber,
  PopNameVerifed,
  PopNameVerifedIcon
} from './styled'

class Avatar extends React.Component {
  constructor (...args) {
    super(...args)
    this.state = {
      hovered: false
    }
  }
  render () {
    const { userId } = this.store('layerPop')
    const theme = this.store('theme')
    const user = this.store('users', userId)

    return (
      <PopAvatar             
        onMouseEnter={(e)=>{
          this.store.setHover({
            type: 'avatar',
            ensName: 'brantly.eth'
          })
        }}
        onMouseLeave={(e)=>{
          this.store.setHover(false)
        }}
      >
        <PopAvatarImg>
          <img src={user.avatar.img.src} />
        </PopAvatarImg>
        <PopAvatarMeta>
          <PopAvatarMetaName>NFT NAME</PopAvatarMetaName>
          <PopAvatarMetaCollection>NFT COLLECTION</PopAvatarMetaCollection>
          <PopAvatarMetaTokenNumber>#192034</PopAvatarMetaTokenNumber>
        </PopAvatarMeta>
        {user.verified.avatar ? (
            <PopNameVerifed style={{ color: theme.good }}>
              <PopNameVerifedIcon>
                <svg viewBox="0 0 512 512">
                  <path fill="currentColor" d="M173.898 439.404l-166.4-166.4c-9.997-9.997-9.997-26.206 0-36.204l36.203-36.204c9.997-9.998 26.207-9.998 36.204 0L192 312.69 432.095 72.596c9.997-9.997 26.207-9.997 36.204 0l36.203 36.204c9.997 9.997 9.997 26.206 0 36.204l-294.4 294.401c-9.998 9.997-26.207 9.997-36.204-.001z" />
                </svg>
              </PopNameVerifedIcon>
            </PopNameVerifed>    
          ) : (
            <PopNameVerifed style={{ color: theme.bad }}>
              <PopNameVerifedIcon>
                <svg viewBox="0 0 640 512">
                  <path fill="currentColor" d="M594.53 508.63L6.18 53.9c-6.97-5.42-8.23-15.47-2.81-22.45L23.01 6.18C28.43-.8 38.49-2.06 45.47 3.37L633.82 458.1c6.97 5.42 8.23 15.47 2.81 22.45l-19.64 25.27c-5.42 6.98-15.48 8.23-22.46 2.81z" />
                </svg>
              </PopNameVerifedIcon>
            </PopNameVerifed>   
          )}
      </PopAvatar>
    )
  }
}

export default Restore.connect(Avatar)
