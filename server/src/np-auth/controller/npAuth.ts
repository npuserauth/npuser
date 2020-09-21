import { RequestHandler } from 'express'
import Joi from '@hapi/joi'
import requestMiddleware from '../../middleware/request-middleware'

export const validationSchema = Joi.object().keys({
  userEmail: Joi.string().required(),
  apiKey: Joi.string().required()
})

const add: RequestHandler = async (req, res) => {
  const { email, apiKey } = req.body

  // Generate a verification code

  // Compose email body

  //  Send email to user

  // Create payload for my private use later. Encrypt it.

  // Put the encrypted payload into a JWT and return.

  res.send({
    message: 'Auth email request sent',
    token
  })
}

export default requestMiddleware(add, { validation: { body: validationSchema } })
