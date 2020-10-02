'use strict'

const TRACE_CALLS = true
const HOST =   process.env.HOST || 'npuser.org'
const SCHEME = process.env.SCHEME || 'https'

module.exports = function (cfg) {
  cfg.isDevelop = false
  cfg.isProduction = true
  cfg.traceApiCalls = TRACE_CALLS
  cfg.scheme = SCHEME
  cfg.host = HOST
  return cfg
}
