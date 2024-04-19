# build
FROM node:20-alpine AS nodebuild

WORKDIR /app

ARG NODE_ENV
ENV NODE_ENV=${NODE_ENV}

COPY . .

RUN npm install -g npm@10

RUN npm install
RUN NODE_ENV=${NODE_ENV} npm run build

# exec
FROM nginx:stable-alpine

COPY --from=nodebuild /app/build /usr/share/nginx/html
COPY --from=nodebuild /app/nginx/nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]