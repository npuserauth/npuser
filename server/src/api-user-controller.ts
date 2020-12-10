import jwt from 'jsonwebtoken'
import express, { RequestHandler, Router } from 'express'
import logger from './logger'
import { createToken, validateToken, VerifyResults } from './auth-util'
import { ApiProvider } from './app'
import { getClientInfo, ClientInfo } from './api-clients/api-clients'
import { ApplicationError, BadRequest, ExpiredRequest, InvalidRequest } from './errors/application-error'
const asyncHandler = require('express-async-handler')

export const TEXT = {
  STEP1_SUCCESS: 'User auth request in progress',
  STEP2_SUCCESS: 'User validated'
}

function asNumber (input: string | null, defaultVal: number): number {
  let results = defaultVal
  if (input) {
    try {
      results = parseInt(input)
    } catch (e) {
      console.log(`Error converting ${input} to number`)
    }
  }
  return results
}
const DIGITS: number = asNumber(process.env.DIGITS, 6) // the size of the validation code

// TODO extend expire time to 30 minutes  TODO let each client determine expiry
const TOKEN_EXPIRES_IN = process.env.TOKEN_EXPIRES_IN || '5m' // the time when the validation code will expire

export interface IEmailSender {
  sendVerificationMail(toAddress: string, vcode: string): Promise<object>
}

/*
This controller lets users register with NPUser.
Post email address - return JWT

User checks email for verification code  which leads to post 2: email address and verification code
 */
type AuthPayload = {
  email: string;
  code: string;
}
type AuthRequest = {
  email: string;
  testing?: boolean; // set true to ask server to return the verification code in the response
}
type ValidateRequest = {
  email: string;
  token: string;
  code: string;
}

/**
 * Shape of the response to the auth request.  This definition is replicated in the npuser client.
 */
type AuthResponse = {
  message: string;
  token: string;
  code?: string; // only present if testing is set true in auth request
}

/**
 * Shape of the response to the validate request.  This definition is replicated in the npuser client.
 */
type ValidateResponse = {
  message: string;
  jwt: string;
}

type npPacket = { clientId: string, data: string }

const generateNDigits = () => {
  const adr = (10 ** (DIGITS - 1))
  const mul = 9 * adr
  const r = Math.random()
  const rm = r * mul
  const gen = Math.floor(rm) + adr
  // console.log(adr, mul, r, rm, gen)
  return gen
}
// console.log(generateNDigits())

export default class ApiUserController implements ApiProvider {
  private readonly sender: IEmailSender

  constructor (sender: IEmailSender) {
    this.sender = sender
  }

  /**
   * Can reject BadRequest
   * @param reqBody
   */
  async unpackRequest (reqBody: object): Promise<object> {
    if (!('clientId' in reqBody) && ('data' in reqBody)) {
      return Promise.reject(new BadRequest())
    }
    const { clientId, data } = reqBody as npPacket
    // get client info rejects BadRequest if clientId is not found
    const info: ClientInfo = await getClientInfo(clientId)
    const sharedSecret = info.clientSecret
    logger.debug(`npuser: unpacked clientId: ${clientId}, data: ${data}`)
    return new Promise((resolve, reject) => {
      jwt.verify(data, sharedSecret, function (err, decoded) {
        if (err) {
          /*
            The JWT is signed and now decrypted with a shared secret.
            By using a signed JWT we can be sure the sender shares the secret and
            therefore the data is coming from a sender that knows the shared secret.
            The JWT may or may not contain an expiry.
            But in general none of the jsonwebtoken errors are expected in this jwt.
            TokenExpiredError, JsonWebTokenError, NotBeforeError
          */
          reject(new BadRequest(err.message))
        }
        resolve(decoded)
      })
    })
  }

  userAuth: RequestHandler = async (req, res, next) => {
    /*
      Unpack the request means "Extract the clientId from the message, lookup this id and get
      the shared secret. Use the secret to decrypt the data, which verifies the request came from the registered
      client.  Finally get the email address of the user to be authorized."
      If the data also includes the parameter 'testing' then return the verification code to the
      calling application. That application wants the verification code for testing purposes.
      Clients should only use the testing parameter on development servers.
       */

    // return new Promise((resolve, reject) => {
    const decoded: object = await this.unpackRequest(req.body)
    // console.log('npuser: userAuth decoded', decoded)
    if (!('email' in decoded)) {
      throw new BadRequest('Invalid auth request payload')
    }

    const { email, testing } = decoded as AuthRequest
    // Generate a verification code
    const vcode = generateNDigits().toString()
    return this.sender.sendVerificationMail(email, vcode)
      .then((r) => {
        logger.debug(`npuser: userAuth email: ${email}, vcode: ${vcode}`)

        const jwtToken: string = createToken({ email, code: vcode }, { expiresIn: TOKEN_EXPIRES_IN })

        const responsePacket: AuthResponse = {
          message: TEXT.STEP1_SUCCESS,
          token: jwtToken
        }
        if (testing) {
          responsePacket.code = vcode
        }
        res.send(responsePacket)
      })
    // don't catch here. Will catch all promise rejects in the wrapper
  }

  userValidate: RequestHandler = async (req, res, next) => {
    try {
      const { token, code, email } = await this.unpackRequest(req.body) as ValidateRequest
      if (!token || !code || !email) {
        return next(new BadRequest('missing token, validation code, email address'))
      }
      const validateResults: VerifyResults = validateToken(token)
      if (validateResults.error) {
        return next(validateResults.error)
      } else if (validateResults.expired) {
        return next(new ExpiredRequest())
      } else if (validateResults.invalid) {
        return next(new InvalidRequest())
      }
      const authPayload: AuthPayload = validateResults.data as AuthPayload
      if (code === authPayload.code && email === authPayload.email) {
        // may add more checks to the above but for now the incoming request is validate so return the user token
        // may not place email address in this packet ... may put a hash of the email address
        const payload = { email, todo: 'can add other data here such as current timestamp' }
        const responsePacket: ValidateResponse = {
          message: TEXT.STEP2_SUCCESS,
          jwt: createToken(payload)
        }
        res.send(responsePacket)
      } else {
        next(new InvalidRequest())
      }
    } catch (e) {
      next(new ApplicationError(' - User Validate - ' + e.message))
    }
  }

  route () {
    const router: Router = Router()
    router.post('/', asyncHandler(this.userAuth))
    router.post('/validate', asyncHandler(this.userValidate))
    router.get('/', (req, res) => {
      logger.debug(`npuser: get / call ip: ${req.ip}`)
      res.status(200).send({ message: 'npuser service is up and running' })
    })
    return router
  }

  addRoute (middleWare: [express.RequestHandler], app: express.Express): void {
    app.use('/apiuser', middleWare, this.route())
  }
}
