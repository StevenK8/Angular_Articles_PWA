FROM node:latest as node
WORKDIR /TP1-StevenKerautret
COPY . .
RUN npm install -g json-server

EXPOSE 3000
CMD json-server --watch db.json --host 0.0.0.0