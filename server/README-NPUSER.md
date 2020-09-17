# NP User API Server

> This is the readme for the npUser server subproject.
>

This project is based on the boilerplate project developed by Sidhant Prana. See the README.md for the original instructions.  This readme will discuss changes and what is important for npuser.

After following the initial construction instructions described in the 
root Readme for this project it was time to try to run in docker containers
and set up the reverse proxy from the caddy.  Found that I needed to first build the project.

```
npm run build

docker-compose up --build
```

Getting this error
```
'Could not connect to mongodb://localhost:27017/books',
```
Which kinda makes sense because the main docker compose yaml file does not start up the mongo container.
Trying this
```
docker-compose -f docker-compose.dev.yml -f docker-compose.yml up --build
```