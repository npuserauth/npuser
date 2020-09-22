import { Text } from '../text'
const rateLimit = require('express-rate-limit')
const ADMIN_MAX_REQUEST_LIMIT = 5
import logger from "../logger";

logger.log('validatorMiddlewareWrapper ADMIN_MAX_REQUEST_LIMIT', ADMIN_MAX_REQUEST_LIMIT)
logger.log('validatorMiddlewareWrapper DEMO_MAX_REQUEST_LIMIT', DEMO_MAX_REQUEST_LIMIT)

export const adminLimiter = rateLimit({
  windowMs: 60 * 60 * 1000,
  max: ADMIN_MAX_REQUEST_LIMIT,
  message: Text.TOO_MANY_REQUESTS_ERROR
})
