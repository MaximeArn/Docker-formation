# Create two container that communicate

## The database

- create a volume to contains db data.
- run a container on mongo image and mount the volume.
- create a new network of type `bridge`.
- connect the db container to the network.
- add a collection in the database and insert a document.

```sh
maxime@MacBook-Maxime ~ % docker volume create dbVolume
dbVolume
maxime@MacBook-Maxime ~ % docker run --name db -d --mount type=volume,source=dbVolume,target=/data/db mongo
Unable to find image 'mongo:latest' locally
latest: Pulling from library/mongo
6e0aa5e7af40: Pull complete
d47239a868b3: Pull complete
49cbb10cca85: Pull complete
9729d7ec22de: Pull complete
7b7fd72268d8: Pull complete
5e2934dacaf5: Pull complete
bf9da24d4b2c: Pull complete
d2f8c3715616: Pull complete
dac42b84e850: Pull complete
0724cb122c25: Pull complete
f0fe10b8b0c1: Pull complete
28e025c87f29: Pull complete
Digest: sha256:75a5f624bd6d14254e0d84c2833f576109672750aaf2bf01d61cb5ead44f4505
Status: Downloaded newer image for mongo:latest
b75c738443f3c4ed9791bad6f7cc2d16e9e37118f347e29e2fd0808a6d7cc4f2
maxime@MacBook-Maxime ~ % docker network create backendNet
ad2caf5525e645a4d1a75abc9f1298cb98a35e4f76233dccafba44a28c31db3a
maxime@MacBook-Maxime ~ % docker network connect backendNet db
maxime@MacBook-Maxime ~ % docker exec -it db sh
# mongo
MongoDB shell version v4.4.4
connecting to: mongodb://127.0.0.1:27017/?compressors=disabled&gssapiServiceName=mongodb
Implicit session: session { "id" : UUID("9a714d6c-bfaa-4763-9e91-a16b84316154") }
MongoDB server version: 4.4.4
---
The server generated these startup warnings when booting:
        2021-04-02T15:41:08.877+00:00: Using the XFS filesystem is strongly recommended with the WiredTiger storage engine. See http://dochub.mongodb.org/core/prodnotes-filesystem
        2021-04-02T15:41:09.423+00:00: Access control is not enabled for the database. Read and write access to data and configuration is unrestricted
---
---
        Enable MongoDBs free cloud-based monitoring service, which will then receive and display
        metrics about your deployment (disk utilization, CPU, operation statistics, etc).

        The monitoring data will be available on a MongoDB website with a unique URL accessible to you
        and anyone you share the URL with. MongoDB may use this information to make product
        improvements and to suggest MongoDB products and deployment options to you.

        To enable free monitoring, run the following command: db.enableFreeMonitoring()
        To permanently disable this reminder, run the following command: db.disableFreeMonitoring()
---
> db.count.insertOne({count: null})
{
        "acknowledged" : true,
        "insertedId" : ObjectId("60673e94838b7cc89dd6d7d1")
}
> ^C
bye
# exit
```

## Node Server

### docker file

- copy the package.json
- run npm install
- copy the script
- fix the path for nodemon
- run te script

```docker
FROM node:alpine

WORKDIR /app

COPY ./package.json .

RUN npm install

COPY . .

ENV PATH=$PATH:/app/node_modules/.bin

CMD [ "nodemon", "src/app.js" ]
```

### the container

- run a container based on the image created with the dockerfile
- connect it to the same network as the database container
- link a port of the container to the 80's port of the host machine

```sh
docker run --network backendNet -p80:80 --name node-server node-server
```
