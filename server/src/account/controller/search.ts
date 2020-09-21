import { RequestHandler } from 'express'
import requestMiddleware from '../../middleware/request-middleware'
import Account from '../Account'

/**
 * Builds a mongoose query object to search books according to book name and id name.
 * @param name String containing the book name or part of the book's name
 * @param apiKey String containing the account key
 */
const buildAccountSearchQuery = (name: string, apiKey: string) => {
  const query: any = {}
  if (name) {
    query.name = new RegExp(`.*${name}.*`, 'i')
  }
  if (apiKey) {
    query.apiKey = new RegExp(`.*${apiKey}.*`, 'i')
  }

  return query
}

const get: RequestHandler = async (req, res) => {
  const { name = undefined, apiKey = undefined } = req.query

  const query = buildAccountSearchQuery((name as string), (apiKey as string))
  const list = await Account.find(query)
  res.send({ list })
}

export default requestMiddleware(get)
