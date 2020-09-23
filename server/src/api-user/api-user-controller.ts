// import { adminLimiter } from '../helpers/middleware'
// import { Text } from '../text'
// import jwt  from 'jsonwebtoken'
import { RequestHandler, Router } from 'express'
import Joi from '@hapi/joi'
import logger from '../logger'
import requestMiddleware from '../middleware/request-middleware'
import { IFileDb } from '../db-local'
import { IAuthUtil } from '../helpers/auth-util'

/*
This controller lets users register with NPUser.
Post email address - return JWT

User checks email for verification code  which leads to post 2: email address and verification code

 */
export default class ApiUserController {
    validationSchema = Joi.object().keys({
      userEmail: Joi.string().required()
    })

    private readonly connection: IFileDb;

    private readonly authUtil: IAuthUtil;

    constructor(connection: IFileDb, authUtil: IAuthUtil) {
      this.connection = connection
      this.authUtil = authUtil
    }

    userGet: RequestHandler = async (req, res) => {
      logger.info('Rcv user get request ')
      res.status(200).send({
        message: 'Auth email request sent'
        // token
      })
    }

  generateNDigits = () => {
    const digits = 5
    const adr = (10 ** (digits - 1))
    const mul = 9 * adr
    return Math.floor(Math.random() * mul) + adr
  };

  userAuth: RequestHandler = async (req, res) => {
    // set to expire in 1 minute
    const TOKEN_EXPIRES_IN = '1m'
    const { email } = req.body
    // Generate a verification code
    const vcode = this.generateNDigits()
    const payload = { email, vcode }
    // Create token for validation.
    // TODO Encrypt it.
    const jwt: string = this.authUtil.createToken(payload, { expiresIn: TOKEN_EXPIRES_IN })
    const d: object = this.authUtil.validateToken(jwt)

    console.log('api user post ', vcode, email, jwt, d)
    // TODO Compose email body
    //  Send email to user

    res.send({
      message: 'User auth request. TODO send email sent. For dev will return vcode but this will be removed',
      vcode,
      jwt
    })
  }

  userValidate: RequestHandler = async (req, res) => {
    const { jwt, code } = req.body
    let d = {}
    console.log('api user validate ', jwt, code)
    try {
      d = this.authUtil.validateToken(jwt)
      console.log('api user validated? ', d)
    } catch (validationError) {
      console.log(validationError.message)
      console.log('not valid')
    }

    res.send({
      message: `User validate? ${JSON.stringify(d)}`
    })
  }

  route() {
    const router: Router = Router()
    router.post('/', requestMiddleware(this.userAuth))
    router.post('/validate', requestMiddleware(this.userValidate))
    router.get('/', requestMiddleware(this.userGet))
    return router
  }
}
