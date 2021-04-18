# handle it

![handle it](./docs/img/handle-it.png)

## Version

0.3.0

## Main Tech Stack

### Project root

- [Lerna](https://github.com/lerna/lerna)
- [Husky](https://github.com/typicode/husky)

### Browser package

- [Apollo Client](https://www.apollographql.com/docs/react/)
- [GraphQL](https://graphql.org/)
- [React](https://reactjs.org/)
- [React-Intl](https://formatjs.io/docs/react-intl/)
- [Sass](https://sass-lang.com/)
- [TypeScript](https://www.typescriptlang.org)

### Server package

- [Apollo Server Express](https://www.npmjs.com/package/apollo-server-express)
- [Express](https://expressjs.com/)
- [GraphQL](https://graphql.org/)
- [node.js](https://nodejs.org)
- [PostgreSQL](https://nodejs.org)
- [React-Intl](https://formatjs.io/docs/react-intl/)
- [TypeOrm](https://typeorm.io/#/)
- [TypeScript](https://www.typescriptlang.org)
- [TypeGraphql](https://github.com/MichalLytek/type-graphql)

---

## Documentation

### Installation

#### 1. Install node.js 14.16.0

#### 2. Install npm 7.8

#### 3. Install PostgreSQL 13

#### 4. Run SQL Shell (psql) or launch **pgAdmin** to create Database ([creating database tutorial](https://www.postgresqltutorial.com/postgresql-create-database/))

```bash
CREATE DATABASE handle-it
```

#### 5. Clone the repository

```bash
git clone https://github.com/aleksanderfret/handle-it.git
```

#### 6. Go to the directory

```bash
cd handle-it
```

#### 7. Install dependencies

```bash
npm run ci
```

#### 8. Go to the server package directory

```bash
cd packages/server
```

#### 9. Create .env file in server package directory and add necessary `.env` keys that you can find in the `.env.example` file

```bash
touch .env
```

#### 10. Create Sendgrid API Key

Create an account on [sendgrid.com](https://sendgrid.com/) and get the Sendgrid API Key to make the app be able to send email messages. Save the key in your `.env` file as `SENDGRID_API_KEY`.

#### 11. Generate RSA keys

Generate three paris of keys: private and public ([you can do it here](https://www.csfieldguide.org.nz/en/interactives/rsa-key-generator/)). Encode them ([you can do it here](https://www.base64encode.org/)). Save encoded keys in your `.env` file as: `ACCESS_PRIVATE_KEY`, `ACCESS_PUBLIC_KEY`, `REFRESH_PRIVATE_KEY`, `REFRESH_PUBLIC_KEY`, `TOKEN_PRIVATE_KE`, `TOKEN_PUBLIC_KEY`.

#### 12. Start development (in the root directory)

```bash
npm start
```

#### 13. Build for production

```bash
npm run build
```

---

### Available scripts

```bash
 "audit": runs npm audit in root and for all packages
 "bootstrap": install all packages dependencies and links any cross dependencies
 "build": build project for production
 "check": runs lint, format and stylelint, test and compile scripts together,
 "ci" runs npm ci for all packages directories
 "ci:all": installs all project dependencies and runs bootstrap and hooks scripts
 "clean": removes node_modules from al packages
 "compile": runs TypeScript for all packages
 "create": creates a new lerna-managed package
 "format": formats all the files using Prettier,
 "format:fix": formats and fix all the files using Prettier,
 "lint": lint all the files using eslint,
 "lint:fix": lint and fix all files using eslint,
 "outdated": runs npm outdated for root and for all packages,
 "postinstall": runs bootstrap and hooks scripts,
 "prepare": install git hooks,
 "prepare-commit-msg": runs prepare-commit-msg hook,
 "pre-commit": runs pre-commit hook,
 "pre-push": runs pre-push hook,
 "reset": runs clean script and runs npm ci,
 "start": runs project for development,
 "stylelint": lint all style files,
 "stylelint:fix": lint and fix all style files,
 "test": run tests or all packages
```
