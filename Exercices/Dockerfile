FROM alpine

LABEL author=maxime version=1.0 language=en

RUN apk add --update nodejs

COPY  ./helloWorld.js /app/ 

WORKDIR /app/

CMD [ "node", "helloWorld.js" ]
