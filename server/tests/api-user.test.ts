import { createApp } from '../src/app'
import { Express, Response } from 'express'
import ApiUserController, { TEXT, IEmailSender } from '../src/api-user-controller'
import { loadClientInfo } from '../src/api-clients/api-clients'
// @ts-ignore
import jwt from 'jsonwebtoken'
const request = require('supertest')

// Load in the client ids
process.env.NPUSER_BASE_CLIENTS = 'client1=secret1,client2=secret2,client3=secret3'
loadClientInfo()

function makeSigned (payload: any) {
  const clientId = 'client1'
  const sharedSecretKey = 'secret1'
  return /* signedPayload */ {
    clientId: clientId,
    data: jwt.sign(payload, sharedSecretKey)
  }
}

// global app
let eApp: Express

function validController () {
  class StubGood implements IEmailSender {
    sendVerificationMail (toAddress: string, vcode: string): Promise<object> {
      // console.log('Inside stub sendVerificationMail() can return something')
      return Promise.resolve({})
    }
  }
  const apiUser = new ApiUserController(new StubGood())
  return createApp([], [apiUser])
}

/**
 * Construct an app with a controller that throws a forced internal error.
 */
function throwsController () {
  class StubBad implements IEmailSender {
    sendVerificationMail (toAddress: string, vcode: string): Promise<object> {
      throw new Error('test throw')
    }
  }
  const apiUser = new ApiUserController(new StubBad())
  return createApp([], [apiUser])
}

/**
 * Construct an app with a controller that throws a forced internal error.
 */
function rejectsController () {
  class StubBad implements IEmailSender {
    sendVerificationMail (toAddress: string, vcode: string): Promise<object> {
      return Promise.reject(new Error('test reject'))
    }
  }
  const apiUser = new ApiUserController(new StubBad())
  return createApp([], [apiUser])
}

describe('API User Test', () => {
  beforeAll(() => {
    eApp = validController()
  })
  afterAll(() => {
    eApp = undefined
  })

  test('GET /apiuser health check should return 200', done => {
    request(eApp)
      .get('/apiuser')
      .expect(200)
      .end(function (err: Error, res: Response) {
        if (err) throw err
        done()
      })
  })

  test('POST /apiuser should return 200', async done => {
    const response = await request(eApp).post('/apiuser')
      .send(makeSigned({ email: 'j@gm.com', testing: true }))
      .set('Accept', 'application/json')
    expect(response.status).toBe(200)
    expect(response.body.message).toBe(TEXT.STEP1_SUCCESS)
    expect(response.body.token).toBeDefined()
    // have code only because we set testing true
    expect(response.body.code).toBeDefined()
    done()
  })
})

describe('API User test throws', () => {
  beforeAll(() => {
    eApp = throwsController()
  })
  afterAll(() => {
    eApp = undefined
  })

  test('POST /apiuser get error 500', async done => {
    const response = await request(eApp).post('/apiuser')
      .send(makeSigned({ email: 'j@gm.com' }))
      .set('Accept', 'application/json')
    expect(response.status).toBe(500)
    expect(response.body.message).toBe('test throw')
    done()
  })
})

describe('API User test rejects', () => {
  beforeAll(() => {
    eApp = rejectsController()
  })
  afterAll(() => {
    eApp = undefined
  })

  test('POST /apiuser get error 500', async done => {
    const response = await request(eApp).post('/apiuser')
      .send(makeSigned({ email: 'j@gm.com' }))
      .set('Accept', 'application/json')
    expect(response.status).toBe(500)
    expect(response.body.message).toBe('test reject')
    done()
  })
})
describe('API Validation Test', () => {
  beforeAll(() => {
    eApp = validController()
  })
  afterAll(() => {
    eApp = undefined
  })

  test('POST /apiuser/validate without all needed parameters', async done => {
    const response = await request(eApp)
      .post('/apiuser/validate')
      .send(makeSigned({ email: 'j@gm.com' }))
      .set('Accept', 'application/json')
    expect(response.status).toBe(400)
    expect(response.body.message).toBeDefined()
    done()
  })

  let token: string
  let vcode: string

  test('POST /apiuser send POST to get token (and vcode with testing parameter)', async done => {
    const response = await request(eApp).post('/apiuser')
      .send(makeSigned({ email: 'j@gm.com', testing: true }))
      .set('Accept', 'application/json')
    // console.log('response: ', response.body)
    token = response.body.token
    vcode = response.body.code
    done()
  })

  test('POST /apiuser/validate with valid code and token', async done => {
    const pload = { code: vcode, token: token, email: 'j@gm.com' }
    // console.log('user validation payload: ', pload)
    const response = await request(eApp)
      .post('/apiuser/validate')
      .send(makeSigned(pload))
      .set('Accept', 'application/json')
    expect(response.status).toBe(200)
    expect(response.body.message).toBe(TEXT.STEP2_SUCCESS)
    expect(response.body.jwt).toBeDefined()
    done()
  })

  test('POST /apiuser/validate with all needed parameters but invalid code', async done => {
    const response = await request(eApp)
      .post('/apiuser/validate')
      .send(makeSigned({ code: 11111, token: token, email: 'j@gm.com' }))
      .set('Accept', 'application/json')
    expect(response.status).toBe(401)
    expect(response.body.message).toBe('Invalid request')
    done()
  })

  test('POST /apiuser/validate with all needed parameters but invalid token', async done => {
    const response = await request(eApp)
      .post('/apiuser/validate')
      .send(makeSigned({ code: 11111, token: 'a' + token, email: 'j@gm.com' }))
      .set('Accept', 'application/json')
    expect(response.status).toBe(401)
    expect(response.body.message).toBe('Invalid request')
    done()
  })
})
