import { corsMiddle } from '../src/cors'

class FakeRequest {
  private _headers: { [key: string]: string }
  private method: string
  constructor (method: string, headers?: { [key: string]: string }) {
    this._headers = headers || {
      origin: 'http://example.com',
      'access-control-request-headers': 'x-header-1, x-header-2'
    }
    this.method = method || 'GET'
  }

  header (name:string) {
    const key = name.toLowerCase()
    return this._headers[key]
  }
}

class FakeResponse {
  private _headers: { [key: string]: string }
  private statusCode: number
  constructor () {
    this._headers = {}
    this.statusCode = 200
  }

  header (name:string) {
    const key = name.toLowerCase()
    return this._headers[key]
  }
}

describe('CORS Test', () => {
  it('corsMiddle', (done) => {
    const req = new FakeRequest('OPTIONS')
    const res = new FakeResponse()
    const cors:any = corsMiddle()
    const next = function (what: any) {
      done()
    }
    cors(req, res, next)
  })

  // TODO add test with a whitelisted url
})
