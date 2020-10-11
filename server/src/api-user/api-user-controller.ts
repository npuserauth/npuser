// import { adminLimiter } from '../helpers/middleware'
// import { Text } from '../text'
import jwt from 'jsonwebtoken'
import { RequestHandler, Router } from 'express'
import Joi from '@hapi/joi'
import logger from '../logger'
import requestMiddleware from '../middleware/request-middleware'
import { IFileDb } from '../db-local'
import { IAuthUtil } from '../helpers/auth-util'
import { EmailSender } from './email-sender'

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
  token: string;
}

type ValidateRequestPacket = {
  email: string;
  token: string;
  code: string;
}

interface AccountKeySecret {
  [key: string]: string
}

const tmpAccounts: AccountKeySecret = {
  client1: 'secret1',
  client2: 'secret2'
}

type npPacket = {clientId: string, data: string}

export default class ApiUserController {
    validationSchema = Joi.object().keys({
      userEmail: Joi.string().required()
    })

    private readonly connection: IFileDb;

    private readonly authUtil: IAuthUtil;
    private emailSender: EmailSender;

    constructor (connection: IFileDb, authUtil: IAuthUtil, emailSender: EmailSender) {
      this.connection = connection
      this.authUtil = authUtil
      this.emailSender = emailSender
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

  unpackRequest (reqBody: npPacket) {
    console.log('unpackRequest body ', reqBody)
    const { clientId, data } = reqBody
    console.log('unpackRequest clientId', clientId)
    // Use the client id to find the shared secret
    const sharedSecret = tmpAccounts[clientId]

    console.log('unpackRequest data', data)
    // const sharedSecret = 'some secret shared with np user'
    // todo look up secret based on client id
    console.log('unpackRequest shared secret: ', sharedSecret)
    const unpacked = jwt.verify(data, sharedSecret)
    console.log('unpackRequest unpacked', unpacked)
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
    // TODO extend expire time to 30 minutes
    const TOKEN_EXPIRES_IN = '1m'
    const jwtToken: string = this.authUtil.createToken(payload, { expiresIn: TOKEN_EXPIRES_IN })
    // TODO remove log output of email. this is a no tracking service!
    logger.info(`useAuth will send ${vcode} to ${email}. TODO remove this output from the logs.`)
    // TODO Compose email body and send email to user
    this.emailSender.sendVerificationMail(email, vcode)
    logger.debug('TODO Compose email body and send email to user')
    const responsePacket: AuthResponsePacket = {
      message: 'User auth request',
      token: jwtToken
    }
    res.send(responsePacket)
  }

  userValidate: RequestHandler = async (req, res) => {
    try {
      console.log('userValidate req.body', req.body)
      const { token, code, email } = this.unpackRequest(req.body) as ValidateRequestPacket
      if (token && code && email) {
        const authPayload: AuthPayload = this.authUtil.validateToken(token) as AuthPayload
        if (code === authPayload.code && email === authPayload.email) {
          // may add more checks to the above but for now the incoming request is validate so return the user token
          // may not place email address in this packet ... may put a hash of the email address
          const payload = { email, todo: 'can add other data here such as current timestamp' }
          const jwt2 = this.authUtil.createToken(payload)
          res.send({
            message: 'User validated',
            jwt: jwt2
          })
        } else {
          res.status(400).send({
            message: 'Not valid'
          })
        }
      }
    } catch (validationError) {
      console.log('ERROR', validationError.message)
      res.status(400).send({
        message: 'Error in validate'
      })
    }
  }

  route () {
    const router: Router = Router()
    router.post('/', requestMiddleware(this.userAuth))
    router.post('/validate', requestMiddleware(this.userValidate))
    router.get('/', requestMiddleware(this.userGet))
    return router
  }
}
