import {
  Express, NextFunction, Request, Response, Router
} from 'express'
import cors from 'cors'
import { IFileDb } from './db-local'
import logger from './logger'
import { IConfig } from './config/config'
import AuthUtil, { IAuthUtil } from './helpers/auth-util'
import AuthController from './np-auth/auth-controller'
import ApiUserController from './api-user/api-user-controller'

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
  const corsOptions = setupCors(config)
  const authUtil: IAuthUtil = new AuthUtil(config)
  const authC = new AuthController(connection)
  const apiUser = new ApiUserController(connection, authUtil)

  app.use((req: Request, res: Response, next: NextFunction) => {
    logger.info(`${req.method} ${req.url}`)
    next()
  })

  const middleWare = [
    cors(corsOptions)
  ]

  return Promise.resolve()
    .then(() => {
      const api = Router()
      // for local and dev only
      api.use('/users', middleWare, authC.route())
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
