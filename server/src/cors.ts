import { Request } from 'express'
import cors from 'cors'

function setupCors () {
  // see https://www.npmjs.com/package/cors#configuring-cors-asynchronously
  const whitelist: string[] = [] // 'http://localhost:28000', 'http://localhost:27000']
  // whitelist.push(config.clientUrl)
  // logger.info('Setup CORS with whitelist:', whitelist)
  type CorsCallback = (err: Error, options: any) => void;
  return function (req: Request, callback: CorsCallback) {
    let corsOptions
    if (whitelist.indexOf(req.header('Origin')) !== -1) {
      corsOptions = { origin: true } // reflect (enable) the requested origin in the CORS response
    } else {
      corsOptions = { origin: false } // disable CORS for this request
    }
    callback(null, corsOptions) // callback expects two parameters: error and options
  }
}

export function corsMiddle () {
  const corsOptions = setupCors()
  return cors(corsOptions)
}
