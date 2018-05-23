FROM node:10-alpine

RUN npm install -g typescript gulp
RUN npm run build

ADD ./*.json .
ADD ./bin .

CMD ["npm", "start"]