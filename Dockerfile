FROM node:alpine

WORKDIR /app

ADD index.js ./
ADD package.json ./
ADD package-lock.json ./

RUN npm install

CMD ["node", "index.js"]
