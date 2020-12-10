import { getClientInfo, ClientInfo, loadClientInfo } from '../src/api-clients/api-clients'

// Note the valid input also tests trimming of client ids and secrets
const validInit = 'client1=secret1,client2 =secret2 , client3 = secret3'
const invalidNotCSV = 'invalidNotCSV=secret1;client2=secret2 , client3 = secret3'
const invalidNotKVP = 'invalidNotKVP=secret1,client2;secret2 , client3 = secret3'
const invalidKeyEmpty = 'invalidKeyEmpty=secret1, =secret2'
const invalidSEmpty = 'invalidSEmpty=secret1,client2='

describe('Test NP Client API initialization', () => {
  const OLD_ENV = process.env

  beforeEach(() => {
    process.env = { ...OLD_ENV } // make a copy
    delete process.env.NPUSER_BASE_CLIENTS
    jest.resetModules() // most important - it clears the cache
  })

  afterAll(() => {
    process.env = OLD_ENV // restore old env
  })

  test('Load with valid input', () => {
    process.env.NPUSER_BASE_CLIENTS = validInit
    loadClientInfo()
  })

  test('Load with nothing input', () => {
    delete process.env.NPUSER_BASE_CLIENTS
    expect(() => {
      // @ts-ignore
      loadClientInfo()
    }).toThrow()
  })

  test('Load with empty input', () => {
    process.env.NPUSER_BASE_CLIENTS = ''
    expect(() => {
      loadClientInfo()
    }).toThrow()
  })

  test('Load with string with just spaces', () => {
    process.env.NPUSER_BASE_CLIENTS = '  '
    expect(() => {
      loadClientInfo()
    }).toThrow()
  })

  test('Load with invalidNotCSV input', () => {
    process.env.NPUSER_BASE_CLIENTS = invalidNotCSV
    expect(() => {
      loadClientInfo()
    }).toThrow()
  })

  test('Load with invalidNotKVP input', () => {
    process.env.NPUSER_BASE_CLIENTS = invalidNotKVP
    expect(() => {
      loadClientInfo()
    }).toThrow()
  })
  test('Load with invalidKeyEmpty input', () => {
    process.env.NPUSER_BASE_CLIENTS = invalidKeyEmpty
    expect(() => {
      loadClientInfo()
    }).toThrow()
  })
  test('Load with invalidSEmpty input', () => {
    process.env.NPUSER_BASE_CLIENTS = invalidSEmpty
    expect(() => {
      loadClientInfo()
    }).toThrow()
  })
})

describe('Test NP Client API get client info', () => {
  beforeEach(() => {
    process.env.NPUSER_BASE_CLIENTS = validInit
    loadClientInfo()
  })

  test('Get valid client id', async (done) => {
    const info: ClientInfo = await getClientInfo('client1')
    expect(info)
    expect(info.clientSecret)
    expect(info.clientSecret === 'secret1')
    done()
  })

  test('Get invalid client id', async () => {
    await expect(getClientInfo('joe')).rejects.toThrow()
  })

  test('Client ids are trimmed', async (done) => {
    const info: ClientInfo = await getClientInfo('client2')
    expect(info)
    done()
  })

  test('Secrets are trimmed', async (done) => {
    const info: ClientInfo = await getClientInfo('client3')
    expect(info)
    expect(info.clientSecret)
    expect(info.clientSecret === 'secret3')
    done()
  })
})
