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

export type SpecificErrors = {
  [key in ErrorReason]?: true;
};

export type Errors = {
  [key in ErrorReason]?: Error;
};

export type CheckErrors = {
  (reason?: ErrorReason): (error: ApolloError) => [boolean, boolean];
  (reason: ErrorReason[]): (error: ApolloError) => [SpecificErrors, boolean];
};
