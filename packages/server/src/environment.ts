const { NODE_ENV, PORT = 5000 } = process.env;

const environment = {
  NODE_ENV,
  PORT: Number(PORT)
};

export default environment;
