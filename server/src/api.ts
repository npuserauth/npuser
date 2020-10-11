import {
  Express, NextFunction, Request, Response, Router
} from 'express'
import cors from 'cors'
import { IFileDb } from './db-local'
import logger from './logger'
import { IConfig } from './config/config'
import AuthUtil, { IAuthUtil } from './helpers/auth-util'
import ApiUserController from './api-user/api-user-controller'
import { constructEmailSender } from './api-user/email-sender'

function setupCors (config: IConfig) {
  const whitelist: string[] = [] // 'http://localhost:28000', 'http://localhost:27000']
  whitelist.push(config.clientUrl)
  whitelist.push(config.apiUrl)
  logger.info('Setup CORS with whitelist:', whitelist)

    type CorsCallback = (err: Error, options: any) => void;
    return function (req: Request, callback: CorsCallback) {
      let corsOptions
      if (whitelist.indexOf(req.header('Origin')) !== -1) {
        corsOptions = { origin: true } // reflect (enable) the requested origin in the CORS response
      } else {
        corsOptions = { origin: false } // disable CORS for this request
      }
      callback(null, corsOptions) // callback expects two parameters: error and options
    }
}

export function apiMiddle (app: Express, config: IConfig, connection: IFileDb) {
  app.use((req: Request, res: Response, next: NextFunction) => {
    logger.info(`NPUSER: ${req.method} ${req.url}`)
    next()
  })

  return constructEmailSender(config)
    .then((emailSender) => {
      const corsOptions = setupCors(config)
      const middleWare = [
        cors(corsOptions)
      ]
      const authUtil: IAuthUtil = new AuthUtil(config)
      const apiUser = new ApiUserController(connection, authUtil, emailSender)
      const api = Router()
      api.use('/apiuser', middleWare, apiUser.route())
      return api
    })
}

export function apiError (app: Express, config: IConfig) {
  // error handlers
  function logErrors (err: Error, req: Request, res: Response, next: NextFunction) {
    logger.error(`NP User server error name: "${err.name}" message: "${err.message}" on path: ${req.path}`)
    next(err)
  }

  app.use(logErrors)
}
