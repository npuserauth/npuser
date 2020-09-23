// import { adminLimiter } from '../helpers/middleware'
// import { Text } from '../text'
import logger from "../logger";
// import jwt  from 'jsonwebtoken'
import { RequestHandler, Router } from 'express'
import Joi from '@hapi/joi'
import requestMiddleware from '../middleware/request-middleware'

export const validationSchema = Joi.object().keys({
  userEmail: Joi.string().required(),
  apiKey: Joi.string().required()
})

const authGet: RequestHandler = async (req, res) => {
  logger.info('Rcv get request ')
  res.status(200).send({
    message: 'Auth email request sent'
    // token
  })
}
const userAuth: RequestHandler = async (req, res) => {
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

export default class AuthController {
  // constructor (authUtil) {
  //   this.authUtil = authUtil
  // }

  route() {
    const router: Router = Router()
    router.post('/auth', requestMiddleware(userAuth, { validation: { body: validationSchema } }))
    router.get('/auth', requestMiddleware(authGet, { validation: { params: validationSchema } }))
    return router
  }
}
