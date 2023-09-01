const officeParser = require("officeparser")
const getDocumentProperties = require('office-document-properties')

class DOCXHelper {
    _fileBuffer = null
    constructor (fileBuffer){
        this._fileBuffer = fileBuffer
    }

    _getPromise = function (promise){
        console.log("PROMISE", promise)
        return promise
    }

    async _waitForPromise(data) {
        try {
          const resolvedData = await this._getPromise(data);
          console.log("WAITED FOR", resolvedData);
          return resolvedData; // Return the resolved value
        } catch (error) {
          throw error; // Rethrow the error if it occurs
        }
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