const http = require('http');
const fs = require('fs');

const odtBuffer = fs.readFileSync('tests/TestDocumentForParsng.docx');

var request = http.request(
  {
    port: 3000,
    hostname: "localhost",
    path: "/getText",
    method: "POST",
    headers: {
      'Content-type': "application/octet-stream"
    },
  },
  (res) => {
    console.log("connected");
    res.on("data", (chunk) => {
      console.log("chunk", "" + chunk);
    });
    res.on("end", () => {
      console.log("No more data");
    });
    res.on("close", () => {
      console.log("Closing connection");
    });
  }
)

request.on('error', (e) => {
  console.error(`problem with request: ${e.message}`);
});

// Write data to request body
request.write(odtBuffer)
request.end(); 