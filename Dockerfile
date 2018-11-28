FROM node:8

COPY . /app

WORKDIR /app

RUN npm install

RUN npm run build

RUN npm install -g http-server

RUN rm -rf /app/src /app/package-lock.json /app/package.json

EXPOSE 3000

CMD ["http-server", "/app", "-p 3000"]