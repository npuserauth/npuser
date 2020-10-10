FROM caddy:2.1.1

# to install curl and jq into the caddy container
# RUN apk add curl jq
# to list the caddy configuration
# RUN curl http://localhost:2019/config/ | jq


# to make changes to a live running caddy, if caddy admin api is enabled
# $ caddy_container_id=$(docker ps | grep caddy | awk '{print $1;}')
# $ docker exec -it $caddy_container_id /bin/sh
# $ cd /etc/caddy
# $ vi CaddyFile
# make a change and save the file
# $ curl -X POST "http://localhost:2019/load" -H "Content-Type: text/caddyfile" --data-binary @Caddyfile
# This script file contains the above curl
COPY forContainer/reload.sh /etc/caddy/
