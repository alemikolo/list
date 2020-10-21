import 'dotenv/config';
import 'module-alias/register';
import 'reflect-metadata';

import startServer from '@app/server';

try {
  startServer();
} catch (error) {
  console.error('Something went terribly wrong', error);
}
