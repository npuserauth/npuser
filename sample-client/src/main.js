import NoPasswordAuthorizer from 'npuser-client'
import readline from 'readline'
import envConfig from './config-env'

const config = envConfig.parsed

console.log('the env contains', config)
async function getCode () {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  })
  return new Promise(resolve => {
    rl.question('What is the verification code  ? ', function (code) {
      console.log(`${code}`)
      rl.close()
      resolve(code)
    })
  })
}

async function f1 () {
  const np = new NoPasswordAuthorizer({
    baseUrl: 'http://localhost:27001',
    clientId: config.CLIENT_ID,
    sharedSecretKey: config.SECRET
  })
  const emailAddress = 'someone@g.c'
  const d = await np.sendAuth(emailAddress)
  console.log('f1 ', d)
  const code = await getCode()
  const v = await np.sendValidation(emailAddress, d.token, code)
  console.log('f1', v)
}

f1()
