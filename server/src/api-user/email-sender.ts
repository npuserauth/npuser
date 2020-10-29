import logger from '../logger'
import { IncomingMessage } from 'http'
const http = require('http')

export class EmailSender {
  async sendPost (payload: object) {
    const payloadStr = JSON.stringify(payload)
    const opts = {
      hostname: 'mailserver', // todo replace with name of container the provides verification email service
      port: 3003,
      path: '/sendmail',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': payloadStr.length
      }
    }
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
        reject(e)
      })
      console.log('EmailSender sendPost: ', payload)
      request.write(payloadStr)
      request.end()
    })
  }

  async sendVerificationMail (toAddress: string, vcode: string) {
    const fromAddress = 'npuser@npuser.org'
    const plainTextBody = `verification code ${vcode}`
    const htmlBody = '<html lang="en"><head></head>\n' +
            '  <body>\n' +
            '    <p>' +
            `verification code ${vcode}` +
            '    </p></body></html>'

    const payload = {
      from: fromAddress,
      to: toAddress,
      subject: 'Verification code',
      text: plainTextBody,
      html: htmlBody
    }
    const info = await this.sendPost(payload)
    logger.info('Message sent: ', info)
  }
}
