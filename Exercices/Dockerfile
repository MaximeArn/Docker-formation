ARG version
FROM alpine:${version}

RUN apk add --update nodejs

ARG filename

COPY  ./${filename} /app/ 

WORKDIR /app/

ENTRYPOINT [ "node", ${filename}]
