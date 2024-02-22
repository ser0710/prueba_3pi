FROM postgres

ENV POSTGRES_USER=ser
ENV POSTGRES_PASSWORD=3pimedios
ENV POSTGRES_DB=prueba

COPY init.sql /docker-entrypoint-initdb.d/

EXPOSE 5433