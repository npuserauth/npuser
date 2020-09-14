caddy_container_id=$(docker ps | grep caddy | awk '{print $1;}')
echo $caddy_container_id
docker exec -it $caddy_container_id /bin/sh
