FROM node:18-alpine

WORKDIR /Backend

COPY package*.json /Backend/

RUN npm install

COPY . .

RUN npx prisma generate




EXPOSE 8000

CMD [ "node","index.js" ]