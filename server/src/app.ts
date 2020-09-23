import express, {
  Router, Request, Response, NextFunction, Express
} from 'express'
import bodyParser from 'body-parser'
import compression from 'compression'
import path from 'path'
import helmet from 'helmet'
import ApplicationError from './errors/application-error'
import { db, IFileDb } from './db-local'
import logger from './logger'
import { apiMiddle } from './api'

export default class EhrApp {
  private readonly app: Express;

  private connection: IFileDb;

  constructor() {
    this.app = express()
  }

  setup(config: any) {
    const { app } = this
    app.use(helmet())
    app.use(compression())
    app.use(bodyParser.urlencoded({ extended: true }))
    app.use(bodyParser.json())
    app.use(express.static(path.join(__dirname, 'public'), { maxAge: 31557600000 }))
    logger.info('Open local db connection')
    return db(config)
      .then((connection: any) => {
        this.connection = connection
        logger.info('Setup api middleware')
        return apiMiddle(app, config, connection)
      })
      .then((api: Router) => {
        app.use('/', api)
        logger.info('Setup final middleware')
        return this.setupFinalMiddle()
      })
      .catch((err) => {
        logger.error('Db connect error')
      })
  }

  get application(): Express {
    return this.app
  }

  private setupFinalMiddle() {
    this.app.use((err: ApplicationError, req: Request, res: Response, next: NextFunction) => {
      if (res.headersSent) {
        return next(err)
      }
      return res.status(err.status || 500).json({
        error: process.env.NODE_ENV === 'development' ? err : undefined,
        message: err.message
      })
    })
    // apiError(app, config)
  }

  close() {
    return (!this.connection ? Promise.resolve()
      : this.connection.close((err: any) => {
        if (err) {
          logger.log({
            level: 'error',
            message: 'Error shutting closing mongo connection',
            error: err
          })
        }
      })
    )
  }
}
