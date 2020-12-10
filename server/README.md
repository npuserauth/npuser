# NP User API Server

> This readme is for the npUser authorization server project.  
> This project provides the npuser API.

For more about npuser see the root README

## Install

TODO clone a fresh copy and determine the steps needed now

## Run

### Development Local

To run the npuser auth service with nodemon you first need to set up the ```.env``` file.
Copy the ```sample.local.env``` file to ```.env```.  Adjust as needed.

```
cp sample.local.env .env
npm run srv:run:dev
```

### Development Docker


To run the npuser auth service with docker you first need to set up the ```.env``` file.
Copy the ```sample.docker.env``` file to ```.env```.  Adjust as needed.

```
cp sample.docker.env .env
npm run srv:run
```

The key difference between the local and docker configurations is found in the send mail host. 
When running everything in the OS enviroment you use localhost to make connections.
When running in a docker environment the servers communicate over the docker network.
In this case the email service is accessible at the 'sendmail' host (defined by the 
service name in the docker compose file).  For example, in the following sample 
docker compose file snippet the service will appear in the docker network as http://npuserserver

```
version: '3'
services:
  npuserserver:
    build:
      context: .
    ...
```


