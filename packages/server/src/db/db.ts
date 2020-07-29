import 'reflect-metadata';
import { createConnection, getConnection } from 'typeorm';

export const connectDB = async (): Promise<void> => {
  try {
    await createConnection();
    console.info('Connected to DB.');
  } catch (error) {
    console.error('DB connection error: ', error);
  }
};

export const disconnectDB = async (): Promise<void> => {
  getConnection().close();

  console.info('DB connection closed.');
};
