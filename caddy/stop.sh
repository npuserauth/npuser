caddy_container_id=$(docker ps | grep caddy | awk '{print $1;}')
echo $caddy_container_id
docker stop $caddy_container_id
