import http from 'http';
import express from 'express';

import startApp from './app';
import environment from '@env/env';
import { connectDB } from '@db/db';

const { PORT } = environment;

const startServer = async () => {
  await connectDB();

  const app = await startApp(express());

  const server = http.createServer(app);

  server.listen(PORT);

  console.info(`"Handel it" server is running on port ${PORT}`);
};

export default startServer;
