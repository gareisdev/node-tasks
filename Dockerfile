FROM node:19-buster

WORKDIR /app

COPY package*.json .
RUN npm install
COPY . .

EXPOSE 8000

CMD ["node", "index.js"]