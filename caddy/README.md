
With the contents of this directory running the following works

```
docker run -p 80:80 -p 443:443 -v $PWD/Caddyfile:/etc/caddy/Caddyfile -v $PWD/site:/var/www -v caddy_data:/data -v caddy_config:/config -v log:/var/log caddy
```


## Logs

Configure Caddy to store logs, in json format, in a file accessible outside the docker container.
```
log {
    output file /var/log/caddy.log
    format json
}
```

To obtain a clean log file output suitable for awking out IP addresses install jq
```
sudo apt-get install jq
```

Then use:
```
jq -j '.ts |= strftime("%Y-%m-%d %H:%M:%S") | .request.remote_addr |= .[:-6]  | .ts, "|", .request.remote_addr,"|", .request.uri,"|", .request.method,"|", .request.proto,"|", .status,"|", .request.headers."User-Agent"[]+"\n"' log/caddy.log
```

Sample output
```
2020-09-16 12:21:15|196.154.245.233|/somepath|GET|HTTP/2.0|304|Mozilla/5.0 (Macintosh; Intel Mac OS X 10.13; rv:80.0) Gecko/20100101 Firefox/80.0
```


## First step client

Use Vue cli to generate sample vue. Run build and copy contents of dist to this caddy/site directory.
rsync -r -e 'ssh -p 8022' * npuser@165.227.37.212:/home/npuser/npuser/caddy

rerun docker on server and verify can see new Vuew client app.


rsync -r -e 'ssh -p 8022' client/dist npuser@165.227.37.212:/home/npuser/npuser/caddy/site