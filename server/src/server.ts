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
    const app = ehrApp.application
    const { serverPort } = configuration
    app.listen(serverPort, () => {
      logger.info(`Server running... ${serverPort}`)
    })
  })
// read .env contents into process.env ... if the file does not exist then load .env.default
// const result = dotenv.config()
// if (result.error) {
//   dotenv.config({ path: '.env.default' })
// }

// import app from './app'
// import MongoConnection from './mongo-connection'

// const mongoConnection = new MongoConnection(process.env.MONGO_URL)
//
// if (process.env.MONGO_URL == null) {
//   logger.log({
//     level: 'error',
//     message: 'MONGO_URL not specified in environment'
//   })
//   process.exit(1)
// } else {
//   mongoConnection.connect(() => {
//     app.listen(app.get('port'), (): void => {
//       console.log(`Express server started at http://localhost:${app.get('port')}`)
//       if (process.env.NODE_ENV === 'development') {
//         console.log(`Swagger UI hosted at http://localhost:${app.get('port')}/dev/api-docs`)
//       }
//     })
//   })
// }

// Close the Mongoose connection, when receiving SIGINT
process.on('SIGINT', () => {
  logger.info('Gracefully shutting down')
  ehrApp.close().then(() => {
    process.exit(0)
  })
})
