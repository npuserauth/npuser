import { RequestHandler } from 'express'
import Joi from '@hapi/joi'
import requestMiddleware from '../../middleware/request-middleware'
import Account from '../Account'

export const addAccountSchema = Joi.object().keys({
  name: Joi.string().required(),
  apiKey: Joi.string().required()
})

const add: RequestHandler = async (req, res) => {
  const { name, apiKey } = req.body

  const account = new Account(name, apiKey)
  await account.save()

  res.send({
    message: 'Saved',
    account: account.toJSON()
  })
}

export default requestMiddleware(add, { validation: { body: addAccountSchema } })
