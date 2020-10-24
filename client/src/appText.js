/* eslint-disable quote-props,quotes */

export const appText = {
  "appTitle": "npuser",
  "topLinks": [
    {
      'hash': '#npuser-how',
      'text': 'How does it work?',
    },
    {
      'hash': '#sso',
      'text': 'Alternatives',
    },
    {
      'hash': '#start',
      'text': 'Get Started',
    },
  ],
  "hero": {
    "title": 'n.p.user',
    "subTitle": "No password user authentication",
    "body": "A simple user authentication service that offers:\n" +
      "\n" +
      "- quick and painless authentication\n" +
      "- no password required\n" +
      "- no tracking of user on the authentication server\n" +
      "- user privacy protected across applications\n" +
      "- open source"
  },
  "npuserHow": [
    {
      title: 'Login',
      imgSrc: 'AppLocked.png',
      imgAlt: 'Application locked',
      body: 'Your user wants to try out and access your application. It\'s simple. Just enter an email address. That\'s it. <ul> <li>No need to create an account.</li><li>No security questions.</li><li>No password strength checking</li> <li>No need for \'Forgot your password?\'</li><li>Etc. It\'s hard for new users!</li> \n Have you ever considered how often potential customers don\'t get past this first step because of password fatigue?'
    },
    {
      title: 'nupser',
      imgSrc: 'AppAsksNpuser.png',
      imgAlt: 'Ask npuser',
      body: 'You application sends an encrypted web message to npuser.  Note that unlike other authorization systems like Single Sign On or OAuth your user\'s experience stays on your web application.  npuser decrypts your message using a shared secret that was set up before.  npuser now generates a simple code and sends an email to your user.'
    },
    {
      title: 'Granted',
      imgSrc: 'AppUnlocked.png',
      imgAlt: 'Access Granted',
      body: 'Your user opens their email application, finds the email with the verification code.  These codes can be simple 5 or 6 digit numbers (less secure but good enough) or more lengthy passphrases comprised of 4 random 5 character words.  Once your web application has the verification code send a web message to npuser. npuser will verify the code and, if valid, tell your application how long ago the user was sent the message.  Your application can then allow your user to enter your web application.'
    }
  ],
  npKeyValues: [
    {
      title: 'Super easy for users',
      body: 'They no longer need to create and remember yet another strong password.'
    },
    {
      title: 'No social media tracking',
      body: 'Some users are concerned about privacy leakage between applications that share authentication services. With npuser our users will be satisified that their activities on your application can never been seen on any other application that uses npuser'
    },
    {
      title: 'No tracking',
      body: 'Users are becoming concerned they are tracked everywhere. npUser provides user authentication without storing anything about the user.'
    },
    {
      title: 'Improve access',
      body: 'Users are often turned away from applications when they need to create yet another secure password that is different from all the other sites they use. '
    },
    {
      title: 'Open Source',
      body: 'npUser is open source, including how the OS is configured so technical users can verify the security and the claim the system is not tracking users'
    },
  ],
  sso: {
    title: 'SSO',
    subTitle:'Single Sign On services',
    ssoWeakness: [
      'If a hacker breaks into your SSO identity provider, all your linked systems could be open to attack. The risk of this is small because high-quality identity providers have top-notch security but there are no guarantees and some users prefer to not trust a single point of failure. <br/> With <strong>npuser</strong> there is nothing to hack on the <strong>npuser</strong>  service so, your users are protected.',
      'Setting up an application with SSO can take longer than expected. <br/> With <strong>npuser</strong> your application simply installs the <strong>npuser</strong> library and makes two web service calls with your application\'s private clientID',
      'During SSO the user is redirected to another company\'s website and will be redirected back to your application when done.  With <strong>npuser</strong> the user never leaves your site.',
      'SSO using social networking services may be restricted with workplaces that block social media sites and government connections where censorship is involved. <br/> With <strong>npuser</strong> your application is always available.',
      'Some SSO-linked sites may give their user data to third-party entities. <br/> With <strong>npuser</strong> your user\'s information is never stored on <strong>npuser</strong> so there is nothing that can be shared.',
    ],
  },
}

export const keyPoints = [
  {
    title: 'Point 1',
    body: '"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."'
  },
  {
    title: 'Point 2',
    body: '"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."'
  },
  {
    title: 'Point 3',
    body: '"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."'
  },
  {
    title: 'Point 4',
    body: '"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."'
  }
]
