const fs = require('fs')
const path = require('path')
const ncp = require('ncp')

const inject = `
  try {
    chrome.runtime.onMessage.addListener((payload, sender, sendResponse) => {
      if (payload.type === 'eth:payload') {
        delete payload.type
        window.postMessage({type: 'eth:payload', payload: payload}, window.location.origin)
      }
      if (payload.type === 'embedded:action') {
        window.postMessage({type: 'embedded:action', action: payload.action}, window.location.origin)
      }
      if (payload.type === 'eth:event') {
        const { event, args } = payload
        delete payload.type
        window.postMessage({ type: 'eth:event', event, args })
      }
    })
    window.addEventListener('message', event => {
      if (event.source === window && event.data && event.data.type === 'eth:send') chrome.runtime.sendMessage(event.data.payload)
    })
    let script = document.createElement('script')
    script.setAttribute('type', 'text/javascript')
    script.src = chrome.runtime.getURL('frame.js')
    script.onload = function () { script.parentNode.removeChild(script) }
    const topLevel = document.head || document.documentElement
    topLevel.appendChild(script)
  } catch (e) {
    console.log(e)
  }
`
fs.writeFile(path.join(__dirname, '../dist/inject.js'), inject, (err) => {
  if (err) throw err
})
const copy = (files) =>
  files.forEach((file) =>
    fs
      .createReadStream(path.join(__dirname, file))
      .pipe(fs.createWriteStream(path.join(__dirname, '../dist/', file)))
  )
copy(['./manifest.json', './settings.html', './icon.png', './FrameLogo.png'])
ncp(path.join(__dirname, './icons'), path.join(__dirname, '../dist/icons'))
ncp(path.join(__dirname, './style'), path.join(__dirname, '../dist/style'))
