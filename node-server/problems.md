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

this occur because nodemon is a program and it is not installed in the `/app` file.

## Fixes

### Install nodemon globally

```docker
RUN npm install -g nodemon && npm install
```

### Modify the `PATH` env variable

the `PATH` env variable is the variable that specify the path

To do it we will pass a new value to `PATH` and we will add the path to the folder that contains node bin to the current `PATH` value.

```docker
ENV PATH = $PATH:/app/node_modules/.bin
```
