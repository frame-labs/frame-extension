import React from 'react'
import Restore from 'react-restore'

class _Video extends React.Component {
  componentDidMount () {
    const location = this.props.src.replace(/\./g,'-')
    const storeBlob = this.store('blobMap', location)
    if (!storeBlob) chrome.runtime.sendMessage({ method: 'media_blob', src: this.props.src, location })
  }
  render () {
    const location = this.props.src.replace(/\./g,'-')
    const storeBlob = this.store('blobMap', location)
    if (!storeBlob) {
      return 'loading'
    } else {
      return (
        <video key={storeBlob} autoPlay loop>
          <source src={storeBlob} type={'video/mp4'} />
        </video> 
      )
    }
  }
}

export const Video = Restore.connect(_Video)

class _Image extends React.Component {
  render () {
    return (
      <img src={this.props.src} /> 
    )
  }
}

export const Image = Restore.connect(_Image)