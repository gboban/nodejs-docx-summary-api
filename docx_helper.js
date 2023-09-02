const officeParser = require("officeparser")
const getDocumentProperties = require('office-document-properties')
const lodash = require("lodash")

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

    async getDocumentStats ( callback ){
        await officeParser.parseOfficeAsync(this._fileBuffer)
        .then((data) => {
          var stats = {}

          stats.characters = 0
          lodash.forEach(data, (value, key) => {
            if(!(" !\"#$%&'()*+,-./:;?@[\]^_`{|}~\n\r\t").indexOf(value)){
                ++stats.characters
            }
          })
          var words = lodash.words(data)
          stats.words = words.length
          stats.sentences = data.replace(/([.?!])\s*(?=[A-Z])/g, "$1|").split("|").length
          var frequencies = {}
          words.forEach((value, key) =>{
            var lowerCaseValue = value.toString().toLowerCase()
            if(
                (frequencies[lowerCaseValue] === undefined) 
                || (frequencies[lowerCaseValue] === null)
            ) frequencies[lowerCaseValue] = 0
            ++frequencies[lowerCaseValue]
          })
          const map = new Map(Object.entries(frequencies));
          var sortedFrequencies = [...map.entries()].sort((a, b) => b[1] - a[1])
          stats.frequencies = sortedFrequencies
        
          callback(null, stats)
        })
        .catch((err) => {
          callback(err, null)
        })
    }
}

module.exports = DOCXHelper