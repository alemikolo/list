import { ApolloError } from '@apollo/client';

import { ErrorReason } from './enums';
import { Error, errorParser } from './types';

const parseErrors = (error?: ApolloError): Error[] => {
  if (!error) {
    return [];
  }

  return error.graphQLErrors.map(({ message, extensions = {} }) => {
    const { exception } = extensions;

    return { message, ...exception };
  });
};

const checkParsedErrors = (parseErrors: errorParser) => (
  reason?: ErrorReason
) => (error?: ApolloError): Boolean => {
  return parseErrors(error).some((err: Error) =>
    reason ? err.reason === reason : err
  );
};

export const checkErrorReasonExist = checkParsedErrors(parseErrors);

export const checkAnyErrorExist = checkParsedErrors(parseErrors)();
