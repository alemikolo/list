/* eslint-disable prefer-destructuring */
const HOST = process.env.HOST;
const PORT = process.env.PORT;
const APP_URL = `http://${HOST}:${PORT}`;

const environment = {
  APP_URL,
  GRAPHQL_URL: `${APP_URL}/graphql`,
  HOST,
  NODE_ENV: process.env.NODE_ENV,
  PORT
};

export default environment;
