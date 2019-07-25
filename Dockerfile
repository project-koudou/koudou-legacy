FROM node:12-alpine

WORKDIR "/app"

COPY . /app

RUN cd /app; ./build-prod.sh

ENV NODE_ENV production
ENV PORT 3030

EXPOSE 3030

CMD ["npm", "start"]
