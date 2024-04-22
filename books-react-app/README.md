# books-react-app

## Versions
- Node - v20.11.0
- NPM - 10.5.2
- React - 18.2.0

## Environment

- Add following to `.env.local` file
    - For **development**

        `NODE_ENV=development`

    - For **production**

        `NODE_ENV=production`

## Build

- To install required modules

    `npm install`

- In the project directory, you can run:

    `npm start`

- Open in browser

    [http://localhost:3000](http://localhost:3000)

- To test

    `npm test`

- Build to deploy

    `npm run build`

### For Typescript

- If typescript is not present in devDependencies

    `npm install --save-dev typescript`

- If `tsconfig.json` is not present

    `npx tsc --init`

## Docker

- To build docker
    - If you want to build for specific environment, you can pass `NODE_ENV` argument
        - E.g. `--build-arg NODE_ENV=development`
    - Default value for argument `NODE_ENV` is `production`

```
docker build --build-arg NODE_ENV=production -f Dockerfile . -t muneer2ishtech/books-react-app:0.1.0
```

- To run
    - Using `docker run`

```
docker run --name=books-react-nginx-container -p 80:80  muneer2ishtech/books-react-app:0.1.0
```

    - Using `compose`

```
NODE_ENV=development docker compose up --build
```

## References
[React reference](./HELP.md)
