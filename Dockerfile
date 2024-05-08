FROM node:18
WORKDIR /tires-app 
COPY ./server/package.json .
RUN npm install

COPY . .
CMD npm start 