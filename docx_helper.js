const officeParser = require("officeparser")
const getDocumentProperties = require('office-document-properties')

class DOCXHelper {
    _fileBuffer = null
    constructor (fileBuffer){
        this._fileBuffer = fileBuffer
    }

    async getDocumentMeta ( callback ){
        const caller = this
        getDocumentProperties.fromBuffer(this._fileBuffer, async function(err, data) {
            var resolvedData = await data
            callback(err, resolvedData)
        })
    }

    async getDocumentText ( callback ){
        await officeParser.parseOfficeAsync(this._fileBuffer)
        .then((data) => {
          callback(null, data)
        })
        .catch((err) => {
          callback(err, null)
        })
    }
}

module.exports = DOCXHelper