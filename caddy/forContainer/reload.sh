
# Use the Caddy Admin API to restart the service
curl -X POST "http://localhost:2019/load" -H "Content-Type: text/caddyfile" --data-binary @Caddyfile
