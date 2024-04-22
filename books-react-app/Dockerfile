# build
FROM node:20-alpine AS nodebuild

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

RUN if [ -z "$NODE_ENV" ]; then \
        echo "Error: NODE_ENV variable is not set."; \
        exit 1; \
    fi

WORKDIR /app

COPY . .

RUN if [ -n "$NODE_ENV" ] && [ "$NODE_ENV" != "production" ] && [ -f ".env.${NODE_ENV}" ]; then \
        cp .env.${NODE_ENV} .env.production; \
    fi

RUN npm install -g npm@10

RUN npm install
RUN npm run build

# exec
FROM nginx:stable-alpine

COPY --from=nodebuild /app/build /usr/share/nginx/html
COPY --from=nodebuild /app/nginx/nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]