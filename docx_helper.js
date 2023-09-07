const officeParser = require("officeparser")
const getDocumentProperties = require('office-document-properties')
const lodash = require("lodash")

module.exports = class DOCXHelper {
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
          const stats = {
            characters: 0,
            words: 0,
            sentences: 0,
            frequencies: []
          }

          stats.characters = 0
          // count non-special characters in text
          lodash.forEach(data, (value, key) => {
            if(!(" !\"#$%&'()*+,-./:;?@[\]^_`{|}~\n\r\t").indexOf(value)){
                ++stats.characters
            }
          })

          // number of words
          stats.words = lodash.words(data).length

          // number of sentences
          stats.sentences = data.replace(/([.?!])\s*(?=[A-Z])/g, "$1|").split("|").length

          // calculate word frequencies
          const frequencies = {}
          words.forEach((value, key) =>{
            const lowerCaseValue = value.toString().toLowerCase()
            if((frequencies[lowerCaseValue] === undefined) || (frequencies[lowerCaseValue] === null)) 
              frequencies[lowerCaseValue] = 0
              ++frequencies[lowerCaseValue]
          })
          const map = new Map(Object.entries(frequencies));
          stats.frequencies = [...map.entries()].sort((a, b) => b[1] - a[1])
        
          callback(null, stats)
        })
        .catch((err) => {
          callback(err, null)
        })
    }
}
