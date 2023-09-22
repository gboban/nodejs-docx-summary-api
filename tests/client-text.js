const http = require('https')
const fs = require('fs')
const path = require('path')

require("dotenv").config({ path: path.resolve(__dirname, "../.env") })

const odtBuffer = fs.readFileSync(path.resolve(__dirname, 'TestDocumentForParsng.docx'))

var request = http.request(
  {
    port: 3000,
    hostname: "localhost",
    path: "/getText",
    method: "POST",
    headers: {
      'Content-type': "application/octet-stream",
      "Authorization": process.env.AUTH_KEY,
    },
  },
  (res) => {
    console.log("connected");
    res.on("data", (chunk) => {
      console.log("chunk", "" + chunk)
    });
    res.on("end", () => {
      console.log("No more data")
    });
    res.on("close", () => {
      console.log("Closing connection")
    });
  }
)

request.on('error', (e) => {
  console.error(`problem with request: ${e.message}`)
});

// Write data to request body
request.write(odtBuffer)
request.end()