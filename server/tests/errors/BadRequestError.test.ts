import { BadRequest } from '../../src/errors/application-error'

describe('BadRequest test suite', () => {
  test('sets default error message', () => {
    const error = new BadRequest()
    expect(error.message).toBe('Bad request')
  })

  test('sets correct message', () => {
    const message = 'error message'
    const error = new BadRequest(message)
    expect(error.message).toBe(message)
  })

  test('sets 500 as default status code', () => {
    const message = 'error message'
    const error = new BadRequest(message)
    expect(error.status).toBe(400)
  })
})
