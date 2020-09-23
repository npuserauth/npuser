import { IConfig } from '../config/config'

const jwt = require('jsonwebtoken')

export interface IAuthUtil {

  createToken(email: any, options?: any): string;

  validateToken(jwtString: string): object;
}

export default class AuthUtil implements IAuthUtil {
    private readonly tokenSecret: string;

    constructor(config: IConfig) {
      this.tokenSecret = config.authTokenSecret
    }

    /**
     * @method authenticate
     * Unwraps the request and attempts to validate its token
     * @param {*} token
     * @description unwraps the token from the Bearer ${token} structure and then
     * passes it to validateToken
     *
     * @returns {*} a function call to validateToken
     * @throws {*} token validation errors from jwt.verify
     *
     */
    authenticate(token: string) {
      const sliced = token.replace('Bearer ', '')
      return this.validateToken(sliced)
    }

    createToken(data: any, options?: any): string {
      return jwt.sign(data, this.tokenSecret, options)
    }

    /**
     * @method validateToken
     * Validates the given token
     * @param {String} jwtString
     * @description this is a wrapper for jwt.verify.
     * This function, can throw several errors; a good example would be whether the token
     * is expired, which commonly happens for a refresh token.
     * @returns {*} the results of calling jwt.verify on the token string.
     * @throws {*} token validation errors from jwt.verify
     * Returns the payload decoded if the signature is valid and optional expiration, audience,
     * or issuer are valid.
     * If not, it will throw the error.
     * (See more in https://github.com/auth0/node-jsonwebtoken)
     */
    validateToken(jwtString: string): any {
      const results = jwt.verify(jwtString, this.tokenSecret)
      return results
    }
}
