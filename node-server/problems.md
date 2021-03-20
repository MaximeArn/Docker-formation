# Path problem

```docker
FROM node:alpine

WORKDIR /app

COPY . .

RUN npm install

CMD ["nodemon", "/app.js"]
```

when we try do start the container build on the above dockerfile we have an error:

```sh
Error: Cannot find module '/app/nodemon'
```
