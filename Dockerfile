FROM nginx:alpine AS frontend

# Instalar supervisord
RUN apk add --no-cache supervisor

# Copy da aplicação frontend
COPY --from=frontend /app/frontend/dist /usr/share/nginx/html
COPY --from=backend /app/backend /app/backend

# Configuração do supervisord
COPY ./supervisord.conf /etc/supervisord.conf

EXPOSE 80
EXPOSE 3000

CMD ["/usr/bin/supervisord", "-c", "/etc/supervisord.conf"]
