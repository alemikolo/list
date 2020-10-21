/* eslint-disable prefer-destructuring */
const HOST = process.env.HOST;
const PORT = process.env.PORT;
const PROTOCOL = process.env.PROTOCOL;
const GRAPHQL_URL = process.env.GRAPHQL_URL;
const APP_URL = `${PROTOCOL}://${HOST}:${PORT}`;

const environment = {
  APP_URL,
  GRAPHQL_URL,
  HOST,
  NODE_ENV: process.env.NODE_ENV,
  PORT
};

export default environment;
