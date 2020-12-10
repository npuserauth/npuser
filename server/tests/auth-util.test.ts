import { createToken, validateToken } from '../src/auth-util'

describe('Auth JWT Tests', () => {
  const TOKEN_EXPIRES_IN = '10m'
  const payload = { field1: 'value1' }
  let jwtToken: string

  test('Can create a jwt', () => {
    jwtToken = createToken(payload, { expiresIn: TOKEN_EXPIRES_IN })
    // console.log('token is', jwtToken)
    expect(jwtToken)
  })

  test('Can validate a jwt', () => {
    const results = validateToken(jwtToken)
    // console.log('results are', results)
    // @ts-ignore
    expect(results.data.field1 === payload.field1)
  })
})

describe('Auth JWT expire tTests', () => {
  /*
  SET a super sort expire time to test the jwt can be expired
   */
  const TOKEN_EXPIRES_IN = '10ms'
  const payload = { field1: 'value1' }
  let jwtToken: string

  test('Can create a jwt', () => {
    jwtToken = createToken(payload, { expiresIn: TOKEN_EXPIRES_IN })
    // console.log('token is', jwtToken)
    expect(jwtToken)
  })

  test('Can validate a jwt', () => {
    try {
      const results = validateToken(jwtToken)
      // console.log('results are', results)
      expect(results.expired)
    } catch (error) {
      // console.log(error)
      expect(error.message === 'jwt expired')
    }
  })
})
