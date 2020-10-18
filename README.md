# npuser

> No password user authentication 

Add user authentication into your application without the worry of password security.

- quick and painless authentication
- no password
- no tracking of user on the authentication server
- no ability to track user activities across applications
- open source

Note that npuser is not intended to protect high value personal information, such as bank accounts.  Instead, it is intended for general use for things like comments on blogs or other simple user services. 

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

Note how npuser does not track the user.  

If your client side code stashes the JWT into the user's browser's local storage then your user can return to your 
application, in that browser, at any time. If your user wants to visit your application from another device or browser
they will need to repeat the validation process.  
Your application can match up the two login attempts based on email address. 
Your application may hash this data so that you’re not storing PII (personally identifying information)


## Project Planning and Status

See related projects:
- https://github.com/bryan-gilbert/npuser-client
- https://github.com/bryan-gilbert/npuser-sendmail

Status:
- The npuser client NPM module is available
- The npuser-sendmail component is done and ready to be linked into npuser
- The main npuser service (this git project) is ready to accept authorization requests including the original
authorization, generation of the verification code and subsequent validation.

Next:
- link npuser to make the local web service call to npuser-sendmail to send the email with the validation code.
 
## Notes

The following describes the steps used to create the server sub-project with Typescript, webpack, babel and lint.

```
git clone https://github.com/bryan-gilbert/docker-express-typescript-boilerplate server
# that repo is a fork of Sidhant Panda's https://github.com/sidhantpanda/docker-express-typescript-boilerplate
cd server
rm -Rf .git
cp .env.default sample.end.default
printf "#Also see parent folder's .gitignore file\n\n#Ignore server generated directories\ndist\ndata\n" > .gitignore
git add *
git add .eslintrc.json .github .gitignore
npm install -D ts-node
git commit -m "Add server from Sidhant Prana's boiler plate project"

```

After the above is complete the boiler plate project will now be incorporated into npuser. To run we need to
set up the .env file which will not get checked in.
```
cp sample.enf.default .env.default
```

If you run this on a Mac with Docker you will need to add the server/data directory to the list of directories that
Docker can mount. Open Docker Preferences ...  Resources .. File Sharing.  Add the server data directory

```
npm run dev
```


[1]: ./NoPasswordUserAuth.png 
