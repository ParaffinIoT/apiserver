FROM node:latest

ENV ROOTPATH=/app

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

WORKDIR $ROOTPATH

COPY package.json .

RUN npm install

COPY . .

USER  node

