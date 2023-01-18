#!/bin/sh

docker stop petrol-stations-service
docker stop petrol-stations-database

docker rm petrol-stations-service
docker rm petrol-stations-database

docker image rm -f petrol-stations-service:0.1
