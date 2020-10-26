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
    'body': 'An application service for user authentication.\n' +
  '- quick and painless registration\n' +
  '- quick and painless authentication\n' +
  '- no passwords\n' +
  '- no tracking of user on the authentication server\n' +
  '- user privacy protected across applications\n' +
  '- more users will try your application\n' +
  '- open source'
}

appText.npKeyValues = {
  id: 'key-values',
  title: 'How npuser works',
    text: [
    {
      title: 'Easy registration',
      body: 'Your users cam quickly get into your service and skip the usual up-front challenge of registration. '
    },
    {
      title: 'Easy login',
      body: 'Your users can return to your application easily. If they come back via the same browser on the same computer then your users can immediately access your service. Yet if they come from another machine or browser the log in process is as easy as the registration process.  Your application can (should?) use a hash of the user\'s email address as their user id. With this hash you can grant your user access to their resources. '
    },
    {
      title: 'No password',
      body: 'Users no longer need to create yet another strong and unique password! No need to implement "Forgot your password".  No password strength checkers and complex validation code. No need for password policies.  Etc. '
    },
    {
      title: 'No tracking',
      body: 'npuser has no need for a database and it doesn\'t track users in any way.  It\'s open source so check out the code!'
    },
    {
      title: 'No social media tracking',
      body: 'Some users are concerned about privacy leakage between applications that share authentication services. Because npuser has no database it can\'t cross reference your users between other applications that may also use npuser.'
    },
    {
      title: 'Improve access',
      body: 'Users are often turned away from applications when they need to create yet another secure password that is different from all the other sites they use. '
    },
    {
      title: 'Open Source',
      body: 'npuser is open source, including how the OS is configured so technical users can verify the security and the claim the system is not tracking users.\n' +
        'Your application can use the nupser.org service or install and run the npuser system on your servers.'
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
      body: 'Your user wants to try out and access your application. With npuser it is simple. You web client asks your potential user to enter their email address. That\'s it.  Your user benefits: <ul> <li>No need to create an account.</li><li>No security questions.</li><li>No need to enter a password twice.</li><li>No need to respond to a Capthca.</li><li>No password strength checking</li> <li>No need for \'Forgot your password?\'</li><li>Etc. It\'s easy for new users!</li></ul> \n (Have you ever considered how often potential customers don\'t get past this first step because of password fatigue?) \n For your application there is <ul><li>No need to check passwords match or are strong enough. Etc.</li><li>No need to hash the user passwords to contend with future hackers.</li><li>Etc.  It\' easy to setup and use.</li></ul>'
    },
    {
      title: 'Next step',
      imgSrc: 'AppAsksNpuser.png',
      imgAlt: 'Ask npuser',
      body: 'Your application sends an encrypted web message to npuser.  Note that unlike other authorization systems like Single Sign On or OAuth your user\'s experience stays on your web application.  npuser decrypts your message using a shared secret that was set up before.  npuser now generates a code and sends an email to your user. It also returns an encrypted message that your application will return back to npuser in the next stage.'
    },
    {
      title: 'Verification',
      imgSrc: 'AppUnlocked.png',
      imgAlt: 'Verification',
      body: 'Your user opens their email application, finds the email with the verification code and enters it into your web client.  Once your web application has the verification code it sends back the encrypted message plus the verification code the user entered. npuser will verify the code and, if valid, tell your application how long ago the user was sent the message.  Your application can then allow your user to enter your web application, or not.\n' +
        'The verification codes are easy to remember 6 digit numbers (a future implementation will offer passphrases comprised of 4 random 5 character words).\n'
    },
    {
      title: 'Authorization',
      body: 'After your user is verified your application can store a JWT token that npuser provides in your user\'s browser localstorage. Whenever your user invokes an API call on your server just have your application foward that JWT to npuser to be sure the bearer of that token has been authenticated.  You can use this to authorize the user to access your services.\n' +
        'Alternatively your application can generate and manage its own JWT.'
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
      body: 'Great! Submit a pull request to the open source project https://github.com/bryan-gilbert/npuser',
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
      body: 'You build your own in each application.'
    },
  ],
}

appText.sso = {
  id: 'sso',
  title: 'SSO',
  subTitle: 'Single Sign On services',
  text: [
    {
      title: 'Single Sign On',
      imgSrc: 'SSO.png',
      imgAlt: 'SSO',
      body: 'Some applications decide to use another authentication service to manage user accounts, including passwords.',
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

