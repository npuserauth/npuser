# Preventing email going to spam

### Set /etc/hosts

> The following may not be needed (*)

(*) As I write this documentation the content of /etc/hosts has reverted to the original which
uses the original droplet name and not the npuser.org domain. Yet postfix works.  The following is just in case....
 
DigitalOcean sets up the Debian instance to manage the hostname.  You can see a warning
about this in /etc/hosts file
- edit the /etc/cloud/cloud.cfg and removed the manage_etc_host line
- need a reboot after editing above  ```sudo reboot```
- ssh back onto server
- edit the /etc/hosts to use your domain 

## Set hostname
```
sudo vi /etc/hostname
sudo hostname $(cat /etc/hostname)
sudo systemctl restart postfix
```
Now email is from npuser@npuser.org



## Reverse DNS
On the DigitalOcean droplet control panel, view the sever hosting your instance.  
Click the name of this server and make sure it matches the domain name e.g. npuser.org


## Testing email 

1. Monitor the log files
2. Send a test email to test@allaboutspam.com.  
3. Look in the logs of a bounce back message. It has a url. The url provides a report of your email server.  

DO IP address range has been used by hackers so my ip is blacklisted by some service.

## To Dos


### SPF (Sender Policy Framework) Check

SPF is a framework wherein a domain owner specifies all the domain's outgoing Email server addresses. This information is specified as a TXT record in your DNS Server,

For example, one can specify that Email server <mx.allaboutspam.com> is the only outgoing email server for the domain <allaboutspam.com>. When an email from this domain is received from a different email server, it can be rejected.

Alternately, when an email from this domain comes from <mx.allaboutspam.com>, recipient can accept it as genuine and bypass SPAM checks.

Specifying SPF records for your domain reduces the chances that emails from your domain will be considered as SPAM and thus increases the deliverability of your Emails.


<npuser.org> does not have any SPF records set. Using SPF minimizes the chances of your Email being rejected or be classified as SPAM. Ideally, the SPF records for <npuser.org> must return 'pass' for your Email server IP <165.227.37.212>. For more details on publishing SPF records for your domain, please refer to http://old.openspf.org/wizard.html

### DKIM (Domain Keys Identified Mail) Check

Domain Keys is a framework wherein a domain owner specifies a public key (or a set of public keys) in domain's DNS records and signs all outgoing emails with one or more keys. A recipient email server can then verify if the email actually came from the Domain specified.

If the recipient email server finds that the keys do not match what is published, it can reject the emails. Alternately, when an email from this domain is authenticated using the keys, recipient can accept it as genuine and bypass SPAM checks.

Specifying Domain Key records for your domain and signing all your outgoing emails reduces the chances that emails from your domain will be considered as SPAM and thus increases the deliverability of your Emails.

