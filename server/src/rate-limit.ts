import express from 'express'
import logger from './logger'

const rateLimit = require('express-rate-limit')

const MAX_REQUEST_LIMIT = 100
const DURATION = 1000 * 60 * 15 // 15 minute window
const TOO_MANY_REQUESTS_ERROR = 'Too many requests triggered. Please, try again later.'

export function rateLimitMiddle (): express.RequestHandler {
  return rateLimit({
    windowMs: DURATION,
    max: MAX_REQUEST_LIMIT,
    message: TOO_MANY_REQUESTS_ERROR
  })
}

logger.log({ level: 'info', message: `Rate limiting MAX_REQUEST_LIMIT: ${MAX_REQUEST_LIMIT} requests per ${DURATION / (1000 * 60)} minutes` })
