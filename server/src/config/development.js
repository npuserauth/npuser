'use strict'

const TRACE_CALLS = true
const API_HOST =   process.env.API_HOST || 'localhost'
const CLIENT_HOST =   process.env.CLIENT_HOST || 'localhost'
const API_PORT = process.env.API_PORT || 27001
const CLIENT_PORT = process.env.CLIENT_PORT || 28000
const SCHEME = process.env.SCHEME || 'http'

module.exports = function (cfg) {
  cfg.isDevelop = true
  cfg.isProduction = false
  cfg.traceApiCalls = TRACE_CALLS
  cfg.scheme = SCHEME
  cfg.apiHost =  API_HOST
  cfg.apiPort = API_PORT
  cfg.clientPort = CLIENT_PORT
  cfg.clientHost = CLIENT_HOST
  cfg.app.title = cfg.app.title + ' - Development Environment'
  return cfg
}
