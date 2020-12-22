FROM node:14-alpine

RUN mkdir -p /home/angular/app/node_modules && chown -R node:node /home/angular/app

WORKDIR /home/angular/app

RUN npm i -g @angular/cli

COPY package*.json ./

EXPOSE 4200

USER node

RUN npm install

COPY --chown=node:node . .

CMD ng serve --host 0.0.0.0
