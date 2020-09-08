import * as dotenv from 'dotenv';
import 'module-alias/register';

dotenv.config();

// eslint-disable-next-line import/first
import runServer from '@app/server';

try {
  runServer();
} catch (error) {
  console.error('Something went terribly wrong', error);
}
