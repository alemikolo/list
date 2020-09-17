const {
  ACCESS_TOKEN_EXP,
  NODE_ENV,
  PORT,
  PRIVATE_KEY = '',
  PUBLIC_KEY = ''
} = process.env;

const environment = {
  ACCESS_TOKEN_EXP: Number(ACCESS_TOKEN_EXP),
  NODE_ENV,
  PORT: Number(PORT),
  PRIVATE_KEY,
  PUBLIC_KEY
};

export default environment;
