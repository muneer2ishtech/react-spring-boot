FROM openjdk:21

VOLUME /tmp

ARG APP_VERSION=0.1.0
ARG SERVER_PORT=8080
ARG SPRING_PROFILES_ACTIVE

EXPOSE ${SERVER_PORT}

COPY target/books-springboot-app-${APP_VERSION}.jar books-springboot-app.jar

ENTRYPOINT ["java", "-jar", "/books-springboot-app.jar"]
