# Dockerfile
FROM node:latest as node
RUN mkdir /app
WORKDIR /app
RUN npm install
COPY . .
RUN ng build --prod

CMD ng serve --host 0.0.0.0 --port 4500
