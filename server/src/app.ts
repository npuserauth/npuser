import express, {
  Router, Request, Response, NextFunction, Express
} from 'express'
import bodyParser from 'body-parser'
import compression from 'compression'
import path from 'path'

import helmet from 'helmet'
import ApplicationError from './errors/application-error'
// import routes from './routes'
// @ts-ignore
import { db } from './db'
import logger from './logger'
import { apiMiddle } from './api'

// const app = express()
//
// app.set('port', process.env.PORT || 3000)
// app.use(routes)

// export default app

export default class EhrApp {
  private readonly app: Express;

  private connection: any;

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
    return db(config)
      .then((connection: any) => {
        this.connection = connection
        return apiMiddle(app, config)
      })
      .then((api: Router) => {
        app.use('/', api)
        return this.setupFinalMiddle()
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
