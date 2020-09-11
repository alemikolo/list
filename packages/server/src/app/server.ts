import http from 'http';
import express from 'express';

import startApp from './app';
import environment from '../environment';

const { PORT } = environment;

const startServer = async () => {
  const app = await startApp(express());

  const server = http.createServer(app);

  server.listen(PORT);

  console.info(`List server is running on port ${PORT}`);
};

export default startServer;
