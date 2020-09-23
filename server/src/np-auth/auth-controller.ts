// import { adminLimiter } from '../helpers/middleware'
// import { Text } from '../text'
// import jwt  from 'jsonwebtoken'
import { RequestHandler, Router } from 'express'
import Joi from '@hapi/joi'
import logger from '../logger'
import requestMiddleware from '../middleware/request-middleware'
import { IFileDb } from '../db-local'

export default class AuthController {
    validationSchema = Joi.object().keys({
      userEmail: Joi.string().required(),
      apiKey: Joi.string().required()
    })

    private readonly connection: IFileDb;

    constructor(connection: IFileDb) {
      this.connection = connection
    }

    authGet: RequestHandler = async (req, res) => {
      logger.info('Rcv get request ')
      res.status(200).send({
        message: 'Auth email request sent'
        // token
      })
    }

    userAuth: RequestHandler = async (req, res) => {
      const { email, apiKey } = req.body

      // Generate a verification code
      // Compose email body

      //  Send email to user

      // Create payload for my private use later. Encrypt it.

      // Put the encrypted payload into a JWT and return.

      res.send({
        message: 'Auth email request sent'
        // token
      })
    }

    route() {
      const router: Router = Router()
      router.post('/auth', requestMiddleware(this.userAuth, { validation: { body: this.validationSchema } }))
      router.get('/auth', requestMiddleware(this.authGet, { validation: { params: this.validationSchema } }))
      return router
    }
}
