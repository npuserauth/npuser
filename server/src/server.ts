/* eslint-disable import/first */
import dotenv from 'dotenv'
import Config, { IConfig } from './config/config'
import EhrApp from './app'
import logger from './logger'

const config = new Config(process.env.NODE_ENV)
const configuration: IConfig = config.config
const ehrApp = new EhrApp()

ehrApp.setup(configuration)
  .then(() => {
    logger.info('Setup done')
    const app = ehrApp.application
    const { serverPort } = configuration
    app.listen(serverPort, () => {
      logger.info(`Server running... ${serverPort}`)
    })
  })

// Close the Mongoose connection, when receiving SIGINT
process.on('SIGINT', () => {
  logger.info('Gracefully shutting down')
  ehrApp.close().then(() => {
    process.exit(0)
  })
})
