
FROM node:10-stretch AS builderino

WORKDIR /app

COPY . .

RUN npm cache verify
RUN npm install
RUN npm run build

FROM node:10-stretch as runner

COPY --from=builderino app/dist ./dist/
COPY --from=builderino app/*.json ./

CMD ["npm", "start"]



