FROM mysql:8.0.33

COPY ./database.sql /docker-entrypoint-initdb.d/

EXPOSE 3306

CMD ["mysqld"]