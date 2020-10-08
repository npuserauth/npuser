# Postfix for npuser

> Document how npuser configures and uses postfix on a Debian server

npuser.org hosts the npuser service and it uses postfix http://www.postfix.org/

Postfix is a mail transfer agent (MTA), an application used to send and receive email. 
npuser configures postfix as a Send-Only SMTP server.

These documents describe and assume you are setting up the one and only npuser.org instance.  You'll need to make
adjustments for your installation and swap npuser.org with your domain.

### Postfix as a Send-Only SMTP Server

Postfix as a Send-Only SMTP Server on Debian 10. DigitalOcean article.  Postfix is a mail transfer agent (MTA), an application used to send and receive email. In this tutorial, you'll install and configure Postfix as a send-only SMTP server on Debian
https://www.digitalocean.com/community/tutorials/how-to-install-and-configure-postfix-as-a-send-only-smtp-server-on-debian-10

```
sudo apt install mailutils
sudo apt install postfix
```
Select the default 'Internet Site'.   Set System mail name to 'npuser@npuser.org'

```
sudo vi /etc/postfix/main.cf
```

I made changes to the end of this file and ended up with this:
```
myhostname = npuser.org
mydomain = npuser.org
alias_maps = hash:/etc/aliases
alias_database = hash:/etc/aliases
myorigin = /etc/mailname
mydestination = $myhostname, localhost.$mydomain, $mydomain
relayhost = 
mynetworks = 127.0.0.0/8 [::ffff:127.0.0.0]/104 [::1]/128
mailbox_size_limit = 0
recipient_delimiter = +
inet_interfaces = loopback-only
inet_protocols = all
debug_peer_list = 127.0.0.1
```

## Start stop postfix
```
sudo systemctl restart postfix
```

I also found these worked:
```
sudo postfix status
sudo postfix stop
sudo postfix start
sudo postfix reload
```

## Tail postfix log files

```
tail -f /var/log/mail.err /var/log/mail.log /var/log/mail.warn

```

## Testing 

Can use telnet to test for connection to postfix on localhost. Default port is 25.

```
sudo apt install telnet
```
Here is a sample where postfix is running and listening
```
$ telnet localhost 25
Trying 127.0.0.1...
Connected to localhost.
Escape character is '^]'.
220 npuser.org ESMTP Postfix (Debian/GNU)
QUIT
221 2.0.0 Bye
Connection closed by foreign host.
```

And when postfix is not running
```
$ telnet localhost 25
Trying 127.0.0.1...
telnet: Unable to connect to remote host: Connection refused

```
