#!/bin/sh

./gradlew clean build
docker build \
    --build-arg JAR_FILE=`ls build/libs/*.jar` \
    --build-arg CONFIG_PROFILES=dev \
    -t petrol-stations-service:0.1 \
    .

docker-compose up
