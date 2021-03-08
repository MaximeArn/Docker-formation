FROM alpine

RUN apk add --update nodejs

COPY  ./helloWorld.js /app/ 

COPY ./goodbye.js /app/

WORKDIR /app/


ENTRYPOINT [ "node" ]
CMD ["helloWorld.js"]
