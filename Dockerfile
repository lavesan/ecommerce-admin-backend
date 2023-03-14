FROM node

WORKDIR /usr/app

COPY package.json ./

RUN npm install -g yarn; exit 0

RUN yarn

COPY . .

EXPOSE 3333

CMD ["yarn", "dev"]
