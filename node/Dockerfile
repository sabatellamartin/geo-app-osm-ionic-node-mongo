FROM node:12.20-alpine

RUN npm install -g nodemon

RUN npm config set unsafe-perm true

RUN apk add git

CMD [ "nodemon", "-L", "server.js" ]
#CMD [ "npm", "run", "dev" ]