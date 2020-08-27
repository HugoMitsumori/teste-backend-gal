FROM node:14.8.0-alpine3.12

RUN apk add git python2 make g++ bash

RUN mkdir -p /app

WORKDIR /app
