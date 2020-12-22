export enum ErrorType {
  BadRequest = 'BadRequest',
  NotFound = 'NotFound',
  Unauthenticated = 'Unauthenticated',
  Unauthorized = 'Unauthorized',
  Invalid = 'Invalid'
}

export enum ErrorReason {
  AccountNotConfirmed = 'AccountNotConfirmed',
  AlreadyExists = 'AlreadyExists',
  InvalidCredentials = 'InvalidCredentials',
  ExpiredLink = 'ExpiredLink'
}
