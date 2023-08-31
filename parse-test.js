const fs = require('fs');
const officeParser = require("officeparser");
const getDocumentProperties = require('office-document-properties');

const odtBuffer = fs.readFileSync('/mnt/c/Users/gboba/Documents/TestDocumentForParsng.docx');

getDocumentProperties.fromBuffer(odtBuffer, function(err, data) {
    if (err) throw err;
    console.log(data);
})


officeParser.parseOfficeAsync(odtBuffer)
.then((data) => console.log(data))
.catch((err) => console.error(err))