FROM node:20
RUN mkdir /usr/src/app
WORKDIR /usr/src/app
RUN npm install -g @angular/cli
COPY . .
