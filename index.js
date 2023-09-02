const express = require("express")
const DOCXHelper = require("./docx_helper")
const app = express()
const port = 3000

app.use(express.raw())

app.post('/getMeta', (req, res) => {
  var helper = new DOCXHelper(req.body)
  helper.getDocumentMeta( (err, data) => {
    if(err){
      console.error(err)
      res.contentType("application/json")
      res.send( { error: "error", message: err.toString() } )
      res.end()    
    }else{
      res.contentType("application/json")
      res.json(data)
      res.end()
    }
  })
})

app.post("/getText", (req, res) => {
  var helper = new DOCXHelper(req.body)
  helper.getDocumentText( (err, data) => {
    if(err){
      console.error(err)
      res.contentType("application/json")
      res.send( { error: "error", message: err.toString() } )
      res.end()    
    }else{
      res.contentType("text/plain")
      res.json(data)
      res.end()
    }
  })
})

app.post("/getStats", (req, res) => {
  var helper = new DOCXHelper(req.body)
  helper.getDocumentStats( (err, data) => {
    if(err){
      console.error(err)
      res.contentType("application/json")
      res.send( { error: "error", message: err.toString() } )
      res.end()    
    }else{
      res.contentType("application/json")
      res.json(data)
      res.end()
    }
  })
})

app.listen(port, () => {
  console.log(`Server is running on port ${port}`)
})
