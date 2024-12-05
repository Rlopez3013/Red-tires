FROM node:18

WORKDIR /app

# CMD ["npm", "i font-awesome"]

COPY package*.json /app/package.json

RUN npm install

COPY . .


EXPOSE 3000

CMD ["npm", "start -- --reset-cache"]