caddy_container_id=$(docker ps | grep caddy | awk '{print $1;}')
echo $caddy_container_id
docker restart $caddy_container_id
