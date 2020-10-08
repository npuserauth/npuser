"use strict";

// npm install nodemailer
const nodemailer = require("nodemailer");

// uncomment the host you wish to use
const HOST_TYPE = 'ethereal'
//const HOST_TYPE = 'sendmail'
//const HOST_TYPE = 'default'

const toAddress = 'someemail'  // list of receivers
const fromAddress = 'npuser@npuser.org'
const subject = 'Test email from npuser.org'

const plainTextBody = 'Hi!\nHow are you?\nHere is the link you wanted:\nhttps://www.python.org'
const htmlBody = '<html><head></head>\n' +
  '  <body>\n' +
  '    <p>Hi!<br>\n' +
  '       How are you?<br>\n' +
  '       Here is the <a href="https://www.python.org">link</a> you wanted.\n' +
  '    </p></body></html>'

async function getConfig(hostType) {
  let cfg = {}
  if (hostType === 'ethereal') {
    let testAccount = await nodemailer.createTestAccount();
    cfg = {
      host: "smtp.ethereal.email",
      port: 587,
      secure: false,
      auth: {
        user: testAccount.user, // generated ethereal user
        pass: testAccount.pass, // generated ethereal password
      },
    }
    console.log('Using ethereal SMTP server. Have created a test account.')
  } else if (hostType === 'sendmail') {
    cfg = {
      sendmail: true,
      newline: 'unix',
      path: '/usr/sbin/sendmail'
    }
    console.log('Using sendmail os binary to set email')
  } else {
    console.log('Using defaults for transport configuration')
  }
  return cfg
}

// async..await is not allowed in global scope, must use a wrapper
async function main(hostType) {
  const cfg = await getConfig(hostType)
  console.log('create transport')
  let transporter = nodemailer.createTransport(cfg);

  let info = await transporter.sendMail({
    from: fromAddress,
    to: toAddress,
    subject: subject,
    text: plainTextBody,
    html: htmlBody
  });

  console.log("Message sent: %s", info.messageId);
  // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

}

main(HOST_TYPE).catch(console.error);
