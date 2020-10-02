'use strict'
const path = require('path')
const pkgPath = path.join(process.cwd(), 'package.json')
// console.log('get package file contents from ', pkgPath)
const pkg = require(pkgPath)
// console.log('package', pkg)
const KEYWORDS = pkg.keywords.join(',')
const TITLE = pkg.title
const DESCRIPTION = pkg.description
// provide defaults for development.  Override for production.
// server port is the port the node js app listens on
const SERVER_PORT = process.env.SERVER_PORT || 27001
//api port is the port number, if any, to use when constructing the API url
const API_PORT = process.env.API_PORT || undefined // 2700
const CLIENT_PORT = process.env.CLIENT_PORT || undefined // 28000
const API_HOST =   process.env.API_HOST
const AUTH_TOKEN_SECRET = process.env.AUTH_TOKEN_SECRET || 'defaultTokenSecretForJWT'
const CLIENT_HOST =   process.env.CLIENT_HOST
const FAVICON = process.env.FAVICON || 'favicon.ico'

module.exports = function() {
  return {
    app: {
      title: TITLE,
      description: DESCRIPTION,
      keywords: KEYWORDS
    },
    port: API_PORT,
    apiHost: API_HOST,
    apiPort: API_PORT,
    authTokenSecret: AUTH_TOKEN_SECRET,
    serverPort: SERVER_PORT,
    clientPort: CLIENT_PORT,
    clientHost: CLIENT_HOST,
    favicon: FAVICON,
  }
}
