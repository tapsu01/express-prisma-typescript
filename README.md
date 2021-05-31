# ExpressJS - Typescript - Prisma

## How to use

1. Clone repository

```sh
git clone https://github.com/tapsu01/express-prisma-typescript.git
```

2. Switch to project directory

```sh
cd express-prisma-typescript
```

3. Create and update environment variables

```sh
cp .env.default .env.development
```

then update value for 2 variables: `DATABASE_URL` and `JWT_SECRET`

4. Install dependencies

```sh
yarn # yarn install
```

5. Migrate

```sh
yarn migrate:dev
```

6. Seed

```sh
yarn seed
```

7. Execute development mode

```sh
yarn serve:dev
```

8. [http://localhost:3000/users](http://localhost:3000/users)

## Dependencies

| Name       | Version | Description                                                                                                           |
| ---------- | ------- | --------------------------------------------------------------------------------------------------------------------- |
| ExpressJS  | 4.17.1  | Node.js web application framework                                                                                     |
| Typescript | 4.2.4   | TypeScript is a superset of JavaScript that compiles to clean JavaScript output.                                      |
| Prisma     | 2.23.0  | Prisma is a server-side library that helps your app read and write data to the database in an intuitive and safe way. |
