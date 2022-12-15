FROM node

WORKDIR /code

COPY package.json .

RUN npm i

# ENV PORT=8000

COPY . .

RUN npm run build

CMD [ "npm","start" ]

EXPOSE 3000