FROM node:alpine

WORKDIR /app

COPY package.json .

RUN npm install

ENV PATH = $PATH:/app/node_modules/.bin

COPY . .

CMD ["nodemon", "app.js"]