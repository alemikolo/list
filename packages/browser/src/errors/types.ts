import { ApolloError } from '@apollo/client';

import { ErrorReason, ErrorType } from './enums';

export type ErrorStatus = 400 | 401 | 403 | 404 | 500;

export type errorParser = (error: ApolloError | undefined) => Error[];

export interface Error {
  type: ErrorType;
  message: string;
  status: ErrorStatus;
  reason?: ErrorReason;
}
