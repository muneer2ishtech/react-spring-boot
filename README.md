# react-spring-boot
Sample app with React for UI and Spring-Boot for API and H2 for DB

## Docker for Node / React

- Create and run docker container

```
docker run --name my-book-node \
 --mount type=bind,source=/d/Practice/react-spring-boot,target=/home/nvm/react-spring-boot \
 -p 3000:3000 \
 -it muneer2ishtech/nvm
```

- Connect to docker container

```
docker exec -it my-book-node bash
```

- Go to code folder

```
cd ~/react-spring-boot/book-react-app/
```

