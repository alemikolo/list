import * as dotenv from 'dotenv';
import 'module-alias/register';
import 'reflect-metadata';

dotenv.config();

// eslint-disable-next-line import/first
import startServer from '@app/server';

try {
  startServer();
} catch (error) {
  console.error('Something went terribly wrong', error);
}
