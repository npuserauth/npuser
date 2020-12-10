import jwt, { TokenExpiredError, JsonWebTokenError } from 'jsonwebtoken'

const { AUTH_TOKEN_SECRET } = process.env // the secret this app uses to encrypt authorization tokens
if (!AUTH_TOKEN_SECRET) {
  console.error('The env must provide AUTH_TOKEN_SECRET; the secret this app uses to encrypt authorization tokens')
  process.exit(1)
}

export function createToken (data: any, options?: any): string {
  return jwt.sign(data, AUTH_TOKEN_SECRET, options)
}

export type VerifyResults = {
  data?: string | object;
  expired?: boolean;
  invalid?: boolean;
  error?: Error;
}

/**
 * @method validateToken
 * This is a wrapper for jwt.verify and it validates the given token
 * @param {String} jwtString
 * @returns VerifyResults the results of calling jwt.verify on the token string.
 * VerifyResults.data contains the decoded payload if the signature is valid and expiration is valid
 * VerifyResults.expired is true if jwt expired (undefined otherwise)
 * VerifyResults.error contains the error if either of the above failed
 *
 * (See more in https://github.com/auth0/node-jsonwebtoken)
 */
export function validateToken (jwtString: string): VerifyResults {
  const results: VerifyResults = {}
  try {
    results.data = jwt.verify(jwtString, AUTH_TOKEN_SECRET)
  } catch (err) {
    if (err instanceof TokenExpiredError) {
      results.expired = true
    } else if (err instanceof JsonWebTokenError) {
      results.invalid = true
    } else {
      results.error = err
    }
  }
  return results
}
