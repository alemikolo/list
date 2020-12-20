import { ApolloError } from 'apollo-server-express';

import { ErrorReason, ErrorType } from './enums';
import { ErrorStatus } from './types';

export class HandleItError extends ApolloError {
  readonly status;
  readonly reason;
  readonly type;

  constructor(
    type: ErrorType,
    status: ErrorStatus,
    message: string,
    reason?: ErrorReason
  ) {
    super(message, type);

    this.type = type;
    this.reason = reason;
    this.status = status;
  }
}

export class BadRequestError extends HandleItError {
  constructor(message = 'Bad Request', reason?: ErrorReason) {
    super(ErrorType.BadRequest, 400, message, reason);
  }
}

export class NotFoundError extends HandleItError {
  constructor(message: string) {
    super(ErrorType.NotFound, 404, message);
  }
}

export class AuthenticationError extends HandleItError {
  constructor(message: string, reason?: ErrorReason) {
    super(ErrorType.Unauthenticated, 401, message, reason);
  }
}

export class AuthorizationError extends HandleItError {
  constructor(message: string) {
    super(ErrorType.Unauthorized, 403, message);
  }
}

export class ValidationError extends HandleItError {
  constructor(message: string, reason: ErrorReason) {
    super(ErrorType.Invalid, 400, message, reason);
  }
}
