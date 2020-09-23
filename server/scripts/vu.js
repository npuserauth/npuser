const http = require('http')

async function send(opts, payload) {
  return new Promise((resolve, reject) => {
    const request = http.request(opts, response => {
      let str = ''
      response.on('data', chunk => {
        str += chunk
      })

      response.on('end', () => {
        const json = JSON.parse(str)
        resolve(json)
      })
    })
    request.setHeader('Content-Type', 'application/json')
    request.write(JSON.stringify(payload))
    request.end()
  })
}

async function sendAuth() {
  const opts = {
    host: 'localhost',
    path: '/apiuser',
    port: '27001',
    method: 'POST'
  }
  const d = await send(opts, { email: 'b.g@c.c' })
  console.log('sent auth got: ', d)
  const opts2 = Object.assign(opts)
  opts2.path = '/apiuser/validate'
  const v = await send(opts2, d)
  console.log('sent validate got: ', v)
  return v
}
async function f1() {
  const d = await sendAuth()
  console.log('f1 ', d)
}

f1()
