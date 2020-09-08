import http from 'http';

import app from './app';
import { connectDB, disconnectDB } from '@db/db';
import environment from '../environment';

const { PORT } = environment;

const runServer = async () => {
  await connectDB();

  await disconnectDB();

  const server = http.createServer(app);

  server.listen(PORT);

  console.info(`List server is running on port ${PORT}`);
};

export default runServer;
