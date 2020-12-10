import { IEmailSender } from './api-user-controller'
import logger from './logger'
import axios, { AxiosResponse } from 'axios'

const { MAIL_SERVER_URL } = process.env // the url to the npuser email service

/*
The NP User server depends on a side server that provides connectivity with a MTA.
The basic idea is to have this mail server support many instances of the NP User api
and to have the mail sever integrated with the MTA that suits the situation. In effect
to decouple the email system from the NP User API.  This also permits other related applications
to use the email sending service.
 */

function composeUrl (path: string): string {
  return MAIL_SERVER_URL + path
}

const API_HEALTH = composeUrl('/')
const API_SENDMAIL = composeUrl('/sendmail')

export default class EmailSender implements IEmailSender {
  constructor () {
    if (!MAIL_SERVER_URL) {
      console.error('Must provide MAIL_SERVER_URL, the url to the npuser email service, in the environment.')
      process.exit(1)
    }
    logger.debug(`npuser: EmailSender url is ${MAIL_SERVER_URL}`)
    const _this = this
    _this.healthCheck()
    setInterval(() => {
      _this.healthCheck()
    }, 1000 * 60 * 15)
  }

  async healthCheck (): Promise<boolean> {
    return axios.get(API_HEALTH)
      .then(() => {
        logger.debug('npuser: email service health check complete')
        return true
      })
      .catch((error: Error) => {
        logger.error('npuser: email service errored ' + error.message)
        return false
      })
  }

  /**
   * Internal method to send a web POST request
   * @param payload
   */
  async _sendPost (path: string, payload: object): Promise<object> {
    return axios.post(path, payload)
      .then(function (response: AxiosResponse) {
        return response.data
      })
  }

  async sendVerificationMail (toAddress: string, vcode: string, clientTitle?: string, clientText?: string) {
    const fromAddress = 'npuser@npuser.org'
    const plainTextBody = `${(clientText ? clientText + '\n' : '')}Verification code ${vcode}`
    const title = clientTitle || 'Verification code'
    const htmlBody = `html lang="en"><head><title>${title}</title></head><body><p>${plainTextBody}</p></body></html>`
    const payload = {
      fromAddress: fromAddress,
      toAddress: toAddress,
      subject: title,
      textBody: plainTextBody,
      htmlBody: htmlBody
    }
    // logger.debug('npuser: verification email message ' + JSON.stringify(payload))
    const info = await this._sendPost(API_SENDMAIL, payload)
    // logger.debug('npuser: verification email message sent. Response info:' + JSON.stringify(info))
    return info
  }
}
