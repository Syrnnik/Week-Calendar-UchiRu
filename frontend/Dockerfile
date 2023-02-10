FROM node:18

WORKDIR /frontend/

COPY package*.json ./

RUN npm install --silent

COPY . .

RUN npm run build --silent

RUN npm install -g serve

# CMD serve -s build
