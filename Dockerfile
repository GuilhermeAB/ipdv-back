FROM node:16-alpine
WORKDIR /ipdv
COPY . /ipdv
RUN yarn set version 3.1.0-rc.6
RUN yarn install