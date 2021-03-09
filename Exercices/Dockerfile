FROM alpine

LABEL author=maxime version=2.5 language=en

ENV ENVIRONMENT=production

RUN apk add --update nodejs

COPY  ./helloWorld.js /app/ 

WORKDIR /app/

CMD [ "node", "helloWorld.js" ]
