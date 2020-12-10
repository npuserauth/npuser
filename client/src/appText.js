/* eslint-disable quote-props,quotes */

import alternativeIntro from './text/alternative-intro.txt'
import ssoWeakness from './text/ssoWeak.txt'

export const appText = {
  'appTitle': 'npuser',
  'topLinks': [
    {
      'hash': '#npuser-how',
      'text': 'How does npuser work?',
    },
    {
      'hash': '#alternatives',
      'text': 'Why npuser',
    },
    {
      'hash': '#start',
      'text': 'Get Started',
    },
  ],
}

appText.hero = {
  'title': 'n p user ',
    'subTitle': 'No password user authentication',
    'body': 'A mobile-friendly authentication service\n' +
  '- quick and painless registration\n' +
  '- login quickly with 6-digit email tokens\n' +
  '- user privacy protected\n' +
  '- open source'
}

appText.npKeyValues = {
  id: 'key-values',
  title: 'How npuser works',
    text: [
    {
      title: 'Easy registration',
      body: 'Your users can quickly log into your service without having to create an account and unique password.'
    },
    {
      title: 'Easy login',
      body: 'Your users login to your application using a one-time code sent to user's email address. '
    },
    {
      title: 'No password',
      body: "Users don't need to create yet another strong and unique password! No need to implement 'Forgot your password'. No password strength checkers and complex validation code. No need for password policies."
    },
    {
      title: 'No tracking',
      body: "Npuser has no need for a database and so it can't track users in any way."
    },
    {
      title: 'Improve access',
      body: 'Users are often turned away from applications when they need to create yet another secure password that is different from all the other sites they use.'
    },
    {
      title: 'Open Source',
      body: 'npuser is open source.  We welcome your contributions!  https://github.com/npuserauth/npuser'
    },
  ],
}

appText.npuserHow = {
  id: 'npuser-how',
  title: 'How npuser works',
  text: [
    {
      title: 'Simple Account Creation and Login',
      imgSrc: 'AppLocked.png',
      imgAlt: 'Application locked',
      body: 'Your user wants to try out and access your application. With npuser it is simple. You web client asks your potential user to enter their email address.'
    },
    {
      title: 'Next step',
      imgSrc: 'AppAsksNpuser.png',
      imgAlt: 'Ask npuser',
      body: 'Your application sends an encrypted message to Npuser. Npuser decrypts your message using a shared secret then generates a 6-digit code which is sent via email to your user.'
    },
    {
      title: 'Verification',
      imgSrc: 'AppUnlocked.png',
      imgAlt: 'Verification',
      body: 'Your user enters the 6-digit verification code which your app returns to npuser along with the encrypted message. Npuser verifies the code and, if valid, tells your application how long ago the user was sent the message. Your application can then allow your user to enter your web application.'
    },
    {
      title: 'Authorization',
      body: "After your user is verified, all subsequent calls your API from your user will include the user's JWT.  Your application verifies the JWT is valid by verifing the token with npuser."
    },
  ],
}

appText.start = {
  id: 'start',
  title: 'Get Started',
  subTitle: 'npuser is not yet ready',
  text: [
    {
      title: 'Status',
      body: 'The service is under active development. Two elements need to be completed and then you can try it out.',
    },
    {
      title: 'Want to be notified?',
      body: 'Great! Send an email to <a href="mailto:info@npuser.org?subject=Tell me when npuser is ready.">Email Us</a> ',
    },
    {
      title: 'Want to contribute?',
      body: 'Great! Submit a pull request to the open source project https://github.com/npuserauth/npuser',
    },
  ],
}

appText.alternatives = {
  id: 'alternatives',
  title: 'Alternatives to npuser',
    intro: alternativeIntro,
    text: [
    {
      title: 'Build your own',
      imgSrc: 'passwords.png',
      imgAlt: 'Per application',
      body: 'Build your own authentication services.  Users will have to sign up for an account and create a unique password.'
    },
  ],
}

appText.sso = {
  id: 'sso',
  title: 'SSO',
  subTitle: 'Google, Facebook and Others (Oauth2)',
  text: [
    {
      title: 'Single Sign On',
      imgSrc: 'SSO.png',
      imgAlt: 'SSO',
      body: 'Some applications use a third-party authentication service (like Google or Facebook) to handle logins.  Like Npuser, this makes logins quick and easy, but at the expense of sharing your private data with the third-party service.',
    },
    {
      title: 'Challenges',
      body: ssoWeakness,
    }
  ],
}

appText.references = {
  id: 'references',
  title: 'References',
  text: [
    {
      title: "How secure is the \“no-password\” login scheme?",
      body: "https://security.stackexchange.com/questions/173450/how-secure-is-the-no-password-login-scheme",
    }
  ]
}

