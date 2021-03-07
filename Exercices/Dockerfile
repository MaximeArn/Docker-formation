FROM alpine

RUN apk add --update nodejs
# this command will install node on alpine 

COPY  ./helloWorld.js /app/
# this command copy the helloWOrld file from the host machine to the container.

CMD [ "node", "/app/helloWorld.js" ]
# this command will execute the helloWorld.js file using node.