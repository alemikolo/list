# handle it

![handle it](./docs/img/handle-it.png)

## Version

0.2.0. - 2020.10.26

## Main Tech Stack

### Browser package

- [Apollo Client](https://www.apollographql.com/docs/react/)
- [GraphQL](https://graphql.org/)
- [React](https://reactjs.org/)
- [Sass](https://sass-lang.com/)
- [TypeScript](https://www.typescriptlang.org)

### Server package

- [Apollo Server Express](https://www.npmjs.com/package/apollo-server-express)
- [Express](https://expressjs.com/)
- [GraphQL](https://graphql.org/)
- [node.js](https://nodejs.org)
- [PostgreSQL](https://nodejs.org)
- [TypeOrm](https://typeorm.io/#/)
- [TypeScript](https://www.typescriptlang.org)

---

## Documentation

### Installation

#### 1. Instal node.js 15.0.1

#### 2. Install PostgreSQL 13

#### 3. Run SQL Shell (psql) or launch **pgAdmin** to create Database ([creating database tutorial](https://www.postgresqltutorial.com/postgresql-create-database/))

```bash
CREATE DATABASE handle-it
```

#### 4. Clone the repository

```bash
git clone https://github.com/aleksanderfret/handle-it.git
```

#### 5. Go to the directory

```bash
cd handle-it
```

#### 6. Install dependencies

```bash
npm i
```

#### 7. Go to the server package directory

```bash
cd packages/server
```

#### 8. Create .env file in server package directory and add necessary `.env` keys that you can find in the `.env.example` file

```bash
touch .env
```

#### 9. Start development (in the root directory)

```bash
npm run dev
```

#### 10. Build for production

```bash
npm run build
```

---

### Available scripts

---

## TODO

- improve auth flow
- revoking tokens
- pretty imports
- cancelable promise
- internationalization
- error handling (error boundaries)
- fetch methods
- split users and auth functionalities to separate modules
- refactor entities
- add nullable true to Field decorator

---
