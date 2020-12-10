import { createApp } from '../src/app'
import { Request, Response } from 'express'

const request = require('supertest')

const eApp = createApp([], [])

eApp.get('/user', function (req: Request, res: Response) {
  res.status(200).json({ name: 'john' })
})

// describe('App Env Tests', () => {
// test('Validate configuration needed for the app to work.', () => {
//   expect(configuration)
//   expect(configuration.authTokenSecret).toBeDefined()
// })
// })

describe('App Test', () => {
  test('GET /user should return 200 and value', done => {
    request(eApp)
      .get('/user')
      .expect('Content-Type', /json/)
      .expect('Content-Length', '15')
      .expect(200)
      .end(function (err: Error, res: Response) {
        if (err) throw err
        done()
      })
  })
  test('GET /random-url should return 404', done => {
    request(eApp)
      .get('/rando')
      .expect(404)
      .end(function (err: Error, res: Response) {
        if (err) throw err
        done()
      })
  })
})
