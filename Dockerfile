FROM node:12-alpine

WORKDIR /usr/zgl-nest-crm
ADD ./dist /usr/zgl-nest-crm/dist/
ADD ./static /usr/zgl-nest-crm/static/
ADD ./package.json /usr/zgl-nest-crm/

RUN npm install --production
ENV NODE_ENV=production
CMD ["npm", "start" ]


