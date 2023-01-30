FROM node:19-alpine

WORKDIR /crud-frontend

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 8081

ENTRYPOINT ["npm", "start"]