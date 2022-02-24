FROM node:16-alpine
WORKDIR /ipdv
COPY . /ipdv
RUN yarn set version 3.2.0
RUN yarn install