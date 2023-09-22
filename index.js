require("dotenv").config();
const https = require('https');
const express = require("express")
const DOCXHelper = require("./docx_helper")

const app = express()
const port = 3000

// check authorization key
function checkAuthorization(req, res, next) {
  const token = req.headers.authorization;

  // check if token is not provided or invalid token
  if (!token || (token != process.env.AUTH_KEY)) {
    return res.status(403).json({ message: 'Forbidden' });
  }

  next();
}

// parse request body as raw
app.use(express.raw())

// returns document meta
app.post('/getMeta', checkAuthorization, (req, res) => {
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

// returns document text
app.post("/getText", checkAuthorization, (req, res) => {
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

// returns document stats
app.post("/getStats", checkAuthorization, (req, res) => {
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

// start server
const sslOptions = {
  key: fs.readFileSync('./sslcert/private-key.pem'), // Path to your private key file
  cert: fs.readFileSync('./sslcert/certificate.pem'),   // Path to your SSL certificate file
}

const server = https.createServer(sslOptions, app);
server.listen(port, () => {
  console.log(`Server is running on port ${port} (HTTPS)`);
});