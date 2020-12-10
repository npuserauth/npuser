
describe('Logger Test', () => {
  beforeEach(() => {
    jest.resetModules()
  })
  test('logger debug production', done => {
    process.env.NODE_ENV = 'production'
    const logger = require('../src/logger').default
    logger.debug('production debug level')
    done()
  })
  test('logger debug dev', done => {
    process.env.NODE_ENV = 'dev'
    const logger = require('../src/logger').default
    logger.debug('dev debug')
    done()
  })
  test('logger error', done => {
    process.env.NODE_ENV = 'production'
    const logger = require('../src/logger').default
    logger.error('production error')
    done()
  })
})
