FROM alpine

ENV ENVIRONMENT=production

RUN apk add --update nodejs

COPY  ./helloWorld.js /app/ 

WORKDIR /app/

CMD [ "node", "helloWorld.js" ]
