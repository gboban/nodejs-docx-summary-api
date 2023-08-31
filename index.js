const officeParser = require("officeparser")
const getDocumentProperties = require('office-document-properties')
const express = require("express")
const app = express()
const port = 3000

app.use(express.raw())

app.post('/getMeta', (req, res) => {
  const fileBuffer = null //req.body
  getDocumentProperties.fromBuffer(fileBuffer, function(err, data) {
    if (err){
      console.error(err)
      res.contentType("application/json")
      res.send( { error: "error", message: err.toString() } )
      res.end()
    }else{
      console.log(data)
      res.contentType("application/json")
      res.json(data)
      res.end()
    }
  })
})

app.post("/getText", (req, res) => {
  const fileBuffer = req.body
  officeParser.parseOfficeAsync(fileBuffer)
    .then((data) => {
      console.log(data)
      res.contentType("text/plain")
      res.send(data)
      res.end()
    })
    .catch((err) => {
      console.error(err)
      res.contentType("application/json")
      res.send( { error: "error", message: err } )
      res.end()
    })
})

app.listen(port, () => {
  console.log(`Server is running on port ${port}`)
})
