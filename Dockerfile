FROM node:18 AS backend

WORKDIR /app/backend

COPY ./backend/package*.json ./

RUN npm install

COPY ./backend .

RUN npm run build

FROM node:18 AS frontend

WORKDIR /app/frontend

COPY ./frontend/package*.json ./

RUN npm install

COPY ./frontend .

RUN npm run build

FROM nginx:alpine

COPY --from=frontend /app/frontend/dist /usr/share/nginx/html

COPY --from=backend /app/backend /app/backend

EXPOSE 80

EXPOSE 3000

CMD ["sh", "-c", "node /app/backend/server.js & nginx -g 'daemon off;'"]
