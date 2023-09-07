# Node.js Docx Summary API

Node.js/Express API for parsing docx documents, allows you to extract document metadata, tex, and calculate some stats.

## Table of Contents

- [Introduction](#introduction)
- [Features](#features)
- [Getting Started](#getting-started)
- [HTTPS Support](#https-support)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)

## Introduction

This is a simple Node.js/Express API that allows you to parse docx documents. It utilizes Express, [officeparser](https://github.com/gfloyd/node-office-parser), and [office-document-properties](https://github.com/nswalton/node-office-document-properties) to extract document metadata and text content.

The API offers three endpoints, `getMeta`, `getText`, and `getStats`, all expect POST requests containing document data. You can find example usage in the `tests/` folder.

## Features

- **Document Metadata:** Extract metadata from docx files.
- **Text Content:** Retrieve the text content of docx documents.
- **Text stats:** Calculate the number of non-special characters, words, sentences, and word frequencies.
- **HTTPS Support:** Secure your API with HTTPS, allowing encrypted communication.

## Getting Started

1. Clone this repository:

   ```bash
   git clone https://github.com/your-username/nodejs-docx-summary-api.git

2. Install dependencies:

    cd nodejs-docx-summary-api
    npm install
    HTTPS Support
    To enable HTTPS support for your API, create an SSL certificate and private key. If you need a self-signed certificate for testing and development, you can generate one using OpenSSL:

    - openssl genpkey -algorithm RSA -out sslcert/private-key.pem
    - openssl req -x509 -new -key sslcert/private-key.pem -out sslcert/certificate.pem
    
    Ensure that the generated certificate (certificate.pem) and private key (private-key.pem) are placed in the sslcert/ directory within your project.

Usage
Please refer to the example code in the tests/ folder to see how to make POST requests to the API endpoints for metadata and text content retrieval.

3. License
Please see LICENSE file for details.
