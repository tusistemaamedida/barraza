FROM node:14.17.1-alpine3.13

WORKDIR /backend
COPY . .
RUN yarn install --production

CMD ["node", "index.js"]