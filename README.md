# npuser pronounced "n.p.user"

![5]

> npuser === no password user authentication 

With npuser you can easily add user authentication into your applications and give your users

- quick and painless authentication
- no password risks
- no tracking on the authentication server
- no tracking of user activities across applications
- open source 

Note that npuser is not intended to protect high value personal information, such as bank accounts.  Instead, it is intended for general use for things like comments on blogs or other simple user services. 

# Why npuser?

To protect ourselves we need different strong passwords for all our applications.  Few users understand how to install and use a common password safe. 

![3]

An alternative, _if the applications support it_ is Single Sign On (SSO).  As a user this makes it easier to manage but you need a really strong password for SSO and all your applications are immediately vulnerable if your SSO account is breach. SSO requires you, as a user, to visit the SSO website and allow this service to track all your login activities. 

![2]

Or your application can join the trend toward using "no password" authentication.  With npauth there is no password to remember and your activities are not tracked by the authentication service. As a user your browser activity stays with the application you use and is never transferred to the authentication service.

![4]

## Project Planning and Status

See related projects:
- https://github.com/npuserauth/npuser-client
- https://github.com/npuserauth/npuser-sendmail
- https://github.com/npuserauth/npuser-sample

Status:
- The npuser client NPM module is available
- The npuser service is operating for development.
- The https://edehr.org project is developing the first client of this npuser.org service.


## Authentication Flow

This concept diagram illustrates the general idea behind npuser and 
how your application (blue boxes) can use npuser (purple noxes) to authenticate your 
users (tan boxes).

![1]


## Technical details

npuser allows your application to verify users based on email address.  Your app and npuser will have a shared API key 
that keeps your users separate from all other applications that use npuser.  
npuser handles the user validation and allows your application to handle user management as needed.  
npuser does not track your users.

Your application will prompt your user to enter their email address. (First tell your user about the process).  
Then your server sends a post message to npuser (over HTTPS) with the email address.  
npuser generates a code and sends your user an email. 
Your app now prompts the user to enter the code. 
Your app next sends both the original email address and the verification code to npuser which validates and returns a JWT. 

Your application can pass this JWT as-is to your client or create its own JWT wrapping the npuser token. 
As your user does stuff with your application your client side code will send the JWT back to your server 
which can then be validated by another API call to npuser.

Note that npuser does not track the user.  

If your client side code stashes the JWT into the user's browser's local storage then your user can return to your 
application, in that browser, at any time. If your user wants to visit your application from another device or browser
they will need to repeat the validation process.  
Your application can match up the two login attempts based on email address. 
Your application may hash this data so that you’re not storing PII (personally identifying information)

##  Install and Run

The setup and running is changing.

**To run the server see the README in the server subfolder.**

To run the client ... see the deploy subfolder for now. 

## Web site

After install, to run a development version of the web site.  For Mac users:

(1).
```
sudo vi /etc/hosts
```
Add a line similar to this:
```
127.0.0.1   npuser.mac
```

(2). Build the client
```bash
cd deploy
npm run client:dev:build
```

(3). Test
```
curl http://npuser.mac:8081
```

You may change the local host name and/or port by editing the ```dev.env``` file in the /deploy directory.


[1]: ./client/src/assets/NoPasswordUserAuth.png
[2]: ./client/src/assets/SSO.png
[3]: ./client/src/assets/passwords.png
[4]: ./client/src/assets/n.p.user.png
[5]: ./client/src/assets/npauth-icon.png
