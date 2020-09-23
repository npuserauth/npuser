#!/usr/bin/env bash
set -e

host=localhost
port=27001

jwt=$(curl http://${host}:${port}/apiuser -X POST --data email=b.g@g.c -s | jq .[])
echo $jwt

#curl http://${host}:${port}/apiuser/validate -X POST --data "jwt=${jwt}"
