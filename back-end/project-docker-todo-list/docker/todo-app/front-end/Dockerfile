FROM node:14-alpine AS todofrontend
WORKDIR /app
ADD node_modules.tar.gz .
COPY . .
EXPOSE 3000
ENTRYPOINT [ "npm" ]
CMD [ "start" ]