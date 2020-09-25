// import { adminLimiter } from '../helpers/middleware'
// import { Text } from '../text'
import jwt from 'jsonwebtoken'
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
type AuthPayload = {
  email: string;
  code: string;
}
type AuthRequestPacket = {
  email: string;
}
type AuthResponsePacket = {
  message: string;
  code: string; // only here temporarily for initial development only
  token: string;
}

// type IValidated = {
//   message: string;
//   vcode: string; // only here temporarily for initial development only
//   token: string;
// }

type npPacket = {clientId: string, data: string}

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

  unpackRequest(reqBody: npPacket) {
    console.log('unpackreqBody body ', reqBody)
    const { clientId, data } = reqBody
    console.log('\nunpackreqBody clientId', clientId, '\n')
    console.log('\nunpackreqBody data', data, '\n')
    const unpacked = jwt.verify(data, 'sssh')
    console.log('\nunpackreqBody unpacked', unpacked, '\n')

    return unpacked
  }

  userAuth: RequestHandler = async (req, res) => {
    const { email } = this.unpackRequest(req.body) as AuthRequestPacket
    console.log('userAuth email: ', email)
    // Generate a verification code
    const vcode = this.generateNDigits().toString()
    const payload:AuthPayload = { email, code: vcode }
    // Create token for validation.
    // TODO Encrypt it.
    const TOKEN_EXPIRES_IN = '1m'
    const jwtToken: string = this.authUtil.createToken(payload, { expiresIn: TOKEN_EXPIRES_IN })
    const d: object = this.authUtil.validateToken(jwtToken)

    console.log('api user post ', vcode, email, jwtToken, d)
    // TODO Compose email body
    //  Send email to user
    const responsePacket: AuthResponsePacket = {
      message: 'User auth request. TODO send email sent. For dev will return vcode but this will be removed',
      code: vcode,
      token: jwtToken
    }
    res.send(responsePacket)
  }

  userValidate: RequestHandler = async (req, res) => {
    try {
      console.log('userValidate req.body', req.body)
      const { token, code } = req.body
      const originalData: ITokenA = this.authUtil.validateToken(token) as ITokenA
      if (code === originalData.vcode) {
        const payload = { email: originalData.email, todo: 'can add other data here such as current timestamp' }
        const jwt2 = this.authUtil.createToken(payload)
        res.send({
          message: 'User validated',
          jwt: jwt2
        })
      } else {
        console.log('invalid code')
        res.status(400).send({
          message: 'Not valid'
        })
      }
    } catch (validationError) {
      console.log('ERROR', validationError.message)
      res.status(400).send({
        message: 'Error in validate'
      })
    }
  }

  route() {
    const router: Router = Router()
    router.post('/', requestMiddleware(this.userAuth))
    router.post('/validate', requestMiddleware(this.userValidate))
    router.get('/', requestMiddleware(this.userGet))
    return router
  }
}
