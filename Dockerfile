FROM node:18

WORKDIR /app

COPY . .

RUN npm install

RUN npm run build

ENV NODE_ENV=production

CMD ["npm", "run", "dev"]
