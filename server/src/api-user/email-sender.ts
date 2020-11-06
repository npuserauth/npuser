import logger from '../logger'
import { IncomingMessage } from 'http'

import { IConfig } from '../config/config'
const http = require('http')

export class EmailSender {
  async sendPost (config: IConfig, payload: object): Promise<object> {
    const payloadStr = JSON.stringify(payload)
    const opts = {
      hostname: config.mailServerHost,
      port: config.mailServerPort,
      path: '/sendmail',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': payloadStr.length
      }
    }
    logger.debug('EmailSender send api call: ', opts)
    console.log('EmailSender send api call: ', opts)
    return new Promise((resolve, reject) => {
      const request = http.request(opts, (response: IncomingMessage) => {
        let str = ''
        response.on('data', chunk => {
          str += chunk
        })
        response.on('end', () => {
          const json = JSON.parse(str)
          resolve(json)
        })
      })
      request.on('error', (e: Error) => {
        logger.error('EmailSender error: ' + e.message)
        reject(e)
      })
      logger.debug('EmailSender sendPost: ', payload)
      request.write(payloadStr)
      request.end()
    })
  }

  async sendVerificationMail (config: IConfig, toAddress: string, vcode: string) {
    const fromAddress = 'npuser@npuser.org'
    const plainTextBody = `verification code ${vcode}`
    const htmlBody = '<html lang="en"><head></head>\n' +
            '  <body>\n' +
            '    <p>' +
            `verification code ${vcode}` +
            '    </p></body></html>'

    const payload = {
      fromAddress: fromAddress,
      toAddress: toAddress,
      subject: 'Verification code',
      textBody: plainTextBody,
      htmlBody: htmlBody
    }
    logger.debug('Message payload: ', payload)
    const info = await this.sendPost(config, payload)
    logger.debug('Message sent: ', info)
    return info
  }
}
