const { NODE_ENV, PORT } = process.env;

const environment = {
  NODE_ENV,
  PORT: Number(PORT)
};

export default environment;
