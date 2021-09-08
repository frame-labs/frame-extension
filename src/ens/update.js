import hasher from '@ensdomains/content-hash'

function ensRecordUpdate (existingRecord, fields) {
  const updateRecord = (method, value) => ({ method, params: [value] })
  const updateTextRecord = (key, value = '') => ({ method: 'setText', params: [key, value] })
  const contentHash = (cid) => cid ? hasher.fromIpfs(cid) : '00'

  const calls = []

  const updateHandlers = {
    content: function (cid) {
      const updatedContent = contentHash(cid)

      if (updatedContent !== contentHash(existingRecord.content)) {
        calls.push(
          updateRecord('setContenthash', `0x${updatedContent}`)
        )
      }
    },
    text: function (key, value) {
      if (value !== existingRecord.text[key]) {
        calls.push(
          updateTextRecord(key, value)
        )
      }
    }
  }

  const { text, ...updatedFields } = fields

  Object.entries(text || []).forEach(([k, v]) => updateHandlers.text(k, v))
  Object.keys(updatedFields)
    .filter(field => Object.keys(updateHandlers).includes(field))
    .forEach(field => updateHandlers[field](updatedFields[field]))

  return calls
}

export default ensRecordUpdate
