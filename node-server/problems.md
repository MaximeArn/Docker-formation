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

# Communication through ports

by default we cannot access to the ports of a container
To do it we must specify an option at the start of the container

`docker run -p HOST_PORT:CONTAINER_PORT.`

for the node-server container we will pass

`docker run -p 80:80 node-server`

The host port cannot be anything other than 80 but the container port can be any other port

the `-p` option for `--publish` will link a port of the container to a port of the host machine.

# installation of all dependencies at each build

```docker
FROM node:alpine

WORKDIR /app

COPY . .

RUN npm install

ENV PATH = $PATH:/app/node_modules/.bin

CMD ["nodemon", "/app.js"]
```

the problem with the docker file above is that as soon as we will modify a file the build cache will be stoped. Indeed the `COPY` instruction is above the `RUN` commmand that installs the dependencies.

To fix it we must divide the `COPY` instruction.
In a first time we copy the package.json next we run tha `npm install` command and at last we copy the rest of the files.

```docker
FROM node:alpine

WORKDIR /app

COPY package.json .

RUN npm install

ENV PATH = $PATH:/app/node_modules/.bin

COPY . .

CMD ["nodemon", "app.js"]
```

# Rebuild for each change

when we make a modification in the files, the file is not modified in the container. To modify the changes in the contaier we will use a bind mount.
