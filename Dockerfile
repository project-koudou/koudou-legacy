FROM node:12-alpine

COPY . /app

WORKDIR /app

RUN ./build-prod.sh

EXPOSE 3030

CMD ["npm", "start"]
