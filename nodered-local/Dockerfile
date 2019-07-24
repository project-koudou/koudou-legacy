FROM node:12-alpine

WORKDIR "/app"

COPY . /app

RUN cd /app; npm install --production

ENV NODE_ENV production
ENV PORT 9000

EXPOSE 9000

CMD ["node", "index.js"]
