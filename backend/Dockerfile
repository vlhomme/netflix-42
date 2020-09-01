FROM node:latest
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
COPY . /usr/src/app/
RUN npm install nodemon -g
RUN npm install
EXPOSE 3000
CMD DEBUG=backend:* npm run devstart
