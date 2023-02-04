FROM node:18

WORKDIR ./

COPY ./backend/package*.json ./backend/
COPY ./backend/ ./backend/

CMD [ "npm", "install", "--prefix", "./backend" ]
CMD [ "npm", "start", "--prefix", "./backend" ]

EXPOSE 3003


COPY ./frontend/package*.json ./frontend/
COPY ./frontend/ ./frontend/

EXPOSE 3000

CMD [ "npm", "install", "--prefix", "./frontend" ]
CMD [ "npm", "start", "--prefix", "./frontend" ]
