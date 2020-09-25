import glob from 'glob'
import path from 'path'
import logger from '../logger'

export interface IConfig {
  authTokenSecret: string;
  apiUrl: string;
  clientUrl: string;
  env: string
  port: number,
  serverPort: number,
  database: {
    name: string,
    host: string,
    port: string,
    user: string,
    password: string,
    options: {
      useNewUrlParser: boolean,
      useCreateIndex: boolean,
      useUnifiedTopology: boolean
    }
  }
}

export default class Config {
  env: string;

  private readonly configuration: IConfig;

  constructor (env: string) {
    this.env = env
    logger.info(`Construct config with env ${env}`)

    // Validate NODE_ENV existence
    this.validateEnvironmentVariable()

    const cwd = path.join(process.cwd(), 'src/config')
    const defaultPath = path.join(cwd, 'default')
    const envPath = path.join(cwd, this.env)

    // Load the config
    // eslint-disable-next-line global-require, import/no-dynamic-require
    const defaultConfig = require(defaultPath)()
    // eslint-disable-next-line global-require, import/no-dynamic-require
    const cfg = require(envPath)(defaultConfig)
    // Merge config files
    // let cfg = Object.assign(defaultConfig, environmentConfig)

    function composeUrl (scheme: string, host: string, port: string, part?: string) {
      return `${scheme}://${host}${port ? `:${port}` : ''}${part ? `/${part}` : ''}`
    }
    let url = composeUrl(cfg.scheme, cfg.clientHost, cfg.clientPort)
    cfg.clientUrl = process.env.CLIENT_URL || url
    url = composeUrl(cfg.scheme, cfg.apiHost, cfg.apiPort, 'api')

    cfg.apiUrl = process.env.API_URL || url
    this.configuration = cfg
    logger.info(this.asStringForLog())
  }

  get config (): IConfig {
    // debug('config >> ', this.configuration)
    return this.configuration
  }

  asStringForLog () {
    let tmp = {
      authTokenSecret: '',
      database: {
        password: ''
      },
      cookieSecret: ''
    }
    try {
      tmp = JSON.parse(JSON.stringify(this.configuration))
    } catch (error) {
      logger.error(`Error cloning configuration ${error}`)
    }
    tmp.database.password = 'sanitizedFor2'
    tmp.cookieSecret = 'sanitized cookie secret'
    tmp.authTokenSecret = 'sanitized auth secret'
    // return JSON.stringify(tmp, null, 2)
    return tmp
  }

  /**
   * Validate NODE_ENV existence
   */
  validateEnvironmentVariable () {
    const environmentFiles = glob.sync(`./src/config/${this.env}.js`)
    if (!environmentFiles.length) {
      if (this.env) {
        logger.error({
          level: 'error',
          message: `Error: No configuration file found for "${this.env}" environment using development instead`
        })
      } else {
        logger.error({
          level: 'error',
          message: 'Error: NODE_ENV is not defined! Using default development environment'
        })
      }
      this.env = 'development'
    }
    const beStrictOnProd = false
    if (beStrictOnProd && this.env === 'production') {
      if (!process.env.COOKIE_SECRET) {
        throw new Error('For production you must set COOKIE_SECRET env ')
      }
    }
  }
}
