# build
FROM node:20-alpine AS nodebuild

WORKDIR /app

COPY . $WORKDIR

RUN pwd
RUN ls -al

# Set the default value for NODE_ENV
ARG NODE_ENV=development

# Replace the line containing NODE_ENV if it exists, or append it otherwise
RUN touch .env.local && \
    sed -i '/^NODE_ENV=/s/.*/NODE_ENV='${NODE_ENV}'/' .env.local || \
    echo "NODE_ENV=${NODE_ENV}" >> .env.local

RUN cat .env.local

RUN npm install -g npm
RUN npm install
RUN npm run build

# exec
FROM nginx:stable-alpine

COPY --from=nodebuild /app/build /usr/share/nginx/html
COPY --from=nodebuild /app/nginx/nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]