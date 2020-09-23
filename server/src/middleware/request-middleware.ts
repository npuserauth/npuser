import {
  RequestHandler, Request, Response, NextFunction
} from 'express'
import Joi from '@hapi/joi'
import BadRequest from '../errors/bad-request'
import logger from '../logger'

const getMessageFromJoiError = (error: Joi.ValidationError): string | undefined => {
  if (!error.details && error.message) {
    return error.message
  }
  return error.details && error.details.length > 0 && error.details[0].message
    ? `PATH: [${error.details[0].path}] ;; MESSAGE: ${error.details[0].message}` : undefined
}

interface HandlerOptions {
  validation?: {
    body?: Joi.ObjectSchema,
    params?: Joi.ObjectSchema,
  }
};

/**
 * This router wrapper catches any error from async await
 * and throws it to the default express error handler,
 * instead of crashing the app
 * @param handler Request handler to check for error
 * @param options
 */
export const relogRequestHandler = (handler: RequestHandler, options?: HandlerOptions,)
    : RequestHandler => async (req: Request, res: Response, next: NextFunction) => {
  if (options?.validation?.body) {
    const { error } = options?.validation?.body.validate(req.body)
    if (error != null) {
      return next(new BadRequest(getMessageFromJoiError(error)))
    }
  }
  if (options?.validation?.params) {
    logger.info(`Try to validate query ${JSON.stringify(req.query)}`)
    const { error } = options?.validation?.params.validate(req.query)
    if (error != null) {
      return next(new BadRequest(getMessageFromJoiError(error)))
    }
  }

  return handler(req, res, next).catch((err: Error) => {
    if (process.env.NODE_ENV === 'development') {
      logger.log({
        level: 'error',
        message: 'Error in request handler',
        error: err
      })
    }
    next(err)
  })
}

export default relogRequestHandler
