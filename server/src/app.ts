import express, {
  Request, Response, NextFunction, Express
} from 'express'
import { AxiosError } from 'axios'
import { ApplicationError } from './errors/application-error'
import bodyParser from 'body-parser'
import compression from 'compression'
import path from 'path'
import helmet from 'helmet'
import logger from './logger'
// const rateLimit = require('express-rate-limit')

// const logMiddleware = (req: Request, res: Response, next: NextFunction) => {
//   logger.info(`NPUSER: ${req.method} ${req.url}`)
//   next()
// }

export interface ApiProvider {
  addRoute (middleWare: express.RequestHandler[], app: Express): void
}

const appError = (err: Error, req: Request, res: Response, next: NextFunction) => {
  if (res.headersSent) {
    return next(err)
  }
  let status = 500
  if (err instanceof ApplicationError) {
    status = (err as ApplicationError).status
  }
  if ('response' in err) {
    const aErr = err as AxiosError
    status = aErr.response ? aErr.response.status : 500
  }
  const errData = {
    message: err.message,
    status: status
  }
  logger.info('npuser: Error handler ' + JSON.stringify(errData))
  return res.status(status).json(errData)
}

export function createApp (middleWare: express.RequestHandler[], apiProviders: ApiProvider[]): Express {
  const eApp = express()
  eApp.use(helmet())
  eApp.use(compression())
  eApp.use(bodyParser.urlencoded({ extended: true }))
  eApp.use(bodyParser.json())
  eApp.use(express.static(path.join(__dirname, 'public'), { maxAge: 31557600000 }))
  apiProviders.forEach((provider) => {
    provider.addRoute(middleWare, eApp)
  })
  // eApp.use(logMiddleware)
  // eApp.use('/apiuser', middleWare, apiUser.route())

  // add error handling middleware last.
  // See https://thecodebarbarian.com/80-20-guide-to-express-error-handling
  eApp.use(appError)
  return eApp
}
