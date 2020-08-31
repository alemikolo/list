import http from 'http';
import 'module-alias/register';

import app from '@app/app';
import { connectDB, disconnectDB } from '@db/db';
import environment from './environment';

const { PORT } = environment;

const runServer = async (port: Number) => {
  await connectDB();

  await disconnectDB();

  const server = http.createServer(app);

  server.listen(port);

  console.info(`List server is running on port ${PORT}`);
};

try {
  runServer(Number(PORT));
} catch (error) {
  console.error('Something went terribly wrong', error);
}
