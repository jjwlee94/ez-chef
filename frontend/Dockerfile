FROM node:14

WORKDIR /app

COPY ./package.json ./
COPY ./package-lock.json ./

RUN npm install --loglevel verbose

COPY . .

EXPOSE 3000

CMD [ "npm", "start" ]