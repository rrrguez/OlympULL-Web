FROM postgres:16

# Variables para inicializar
ENV POSTGRES_DB=olympull
ENV POSTGRES_USER=admin
ENV POSTGRES_PASSWORD=admin

# Se copia el script de inicialización
COPY init.sql /docker-entrypoint-initdb.d/
