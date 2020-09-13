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

This is still a concept and subject to change.  This diagram illustrates the concept and how a user could authenticate with an application that uses ```npuser```

![1]



##Technical details

npuser allows your application to verify users based on email address.  Your app and npuser will have a shared API key that keeps your users separate from all other applications that use npuser.  npuser handles the user validation and allows your application to handle user management as needed.  npuser doesn’t need to track your users.

Your application will prompt your user to enter their email address. (First tell your user about the process).  Your server sends a post message to npuser (over HTTPS) with the email address.  npuser generates a 6-digit code and sends your user an email. Your app now prompts the user to enter the code. Your app next sends both the original email address and the verification code to npuser which validates and returns a JWT. 

Your application can pass this JWT as-is to your client or create its own JWT wrapping the npuser token. As your user does stuff with your application your client side code will send the JWT back to your server which can extract, if needed, the npuser token and make a GET call to npuser to validate the token (“Is this user the one who was authenticated?”). Tokens may have expiry times.

Note how npuser doesn’t need to track the user.  It can purge both the SMTP logs and it’s own logs of any trace of the user's email addresses.  

It may be possible to set up npuser to send the no-reply email from your application domain.

If your client side code stashes the JWT into the user's browser's local storage then your user can return to your application, in that browser, at any time. If your user wants to visit your application from another device or browser they will need to repeat the validation process.  Since your application already has to hold onto user data there is no need for npuser to also track this. Your application can match up the two login attempts based on email address.  Your application may hash this data so that you’re not storing PII (personally identifying information)


## Some thoughts ..

What can a user do if they find their email account has been hacked?  Good question but what is the answer to how can they recover their emails? Not sure what the answer is but this suggests the need to consider a second means of verifying users when the application information is important to users.  npuser is not intended to protect high value personal information.





[1]: ./NoPasswordUserAuth.png 
