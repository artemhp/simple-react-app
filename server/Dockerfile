FROM node:14.10.0-alpine3.10

RUN mkdir -p /usr/src/app

WORKDIR /usr/src/app
COPY . /usr/src/app
RUN npm install

EXPOSE 4444

CMD ["npm", "run", "host"]