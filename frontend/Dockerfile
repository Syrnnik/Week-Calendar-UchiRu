FROM node:18

WORKDIR /frontend/

ADD ./package*.json ./

RUN npm install --silent

COPY ./ ./

# RUN npm run build --silent
