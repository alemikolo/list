export enum ErrorType {
  BadRequest = 'BadRequest',
  NotFound = 'NotFound',
  Unauthenticated = 'Unauthenticated',
  Unauthorized = 'Unauthorized',
  Invalid = 'Invalid'
}

export enum ErrorReason {
  AccountNotConfirmedError = 'AccountNotConfirmedError',
  AlreadyExistsError = 'AlreadyExistsError',
  InvalidCredentialsError = 'InvalidCredentialsError',
  ExpiredLinkError = 'ExpiredLinkError',
  SendingFailedError = 'SendingFailedError'
}
