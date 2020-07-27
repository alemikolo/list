import http from 'http';
import 'module-alias/register';

import app from '@app/app';

const { PORT = 8080 } = process.env;

const runServer = (port: Number) => {
  const server = http.createServer(app);

  server.listen(port);

  console.info(`List server is running on port ${PORT}`);
};

try {
  runServer(Number(PORT));
} catch (error) {
  console.error('Something went terribly wrong', error);
}
