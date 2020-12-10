import express, { Express } from 'express'
import { createApp } from './app'
import { corsMiddle } from './cors'
import { rateLimitMiddle } from './rate-limit'
import ApiUserController from './api-user-controller'
import { loadClientInfo } from './api-clients/api-clients'
import EmailSender from './email-sender'
import logger from './logger'

const { SERVER_PORT } = process.env // port for this service to listen on
if (!SERVER_PORT) {
  console.error('Must provide SERVER_PORT, the port for this service, in the environment.')
  process.exit(1)
}

try {
  // set up base clients
  loadClientInfo()
} catch (err) {
  console.error(err.message)
  process.exit(1)
}

const middleWare: Array<express.RequestHandler> = [corsMiddle(), rateLimitMiddle()]

const emailSender = new EmailSender()

const apiUser = new ApiUserController(emailSender)

const app: Express = createApp(middleWare, [apiUser])

app.listen(SERVER_PORT, async () => {
  logger.log({ level: 'info', message: `NP User server listening on port ${SERVER_PORT}` })
})
