FROM node:12-alpine

ARG DEMO
ENV DEMO ${DEMO:-}

COPY . /app

WORKDIR /app

RUN ./build-prod.sh

EXPOSE 3030

CMD ["npm", "start"]
