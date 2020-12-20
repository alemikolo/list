export enum ErrorType {
  BadRequest = 'BadRequest',
  NotFound = 'NotFound',
  Unauthenticated = 'Unauthenticated',
  Unauthorized = 'Unauthorized',
  Invalid = 'Invalid'
}

export enum ErrorReason {
  AlreadyExist = 'AlreadyExist',
  WrongCredentials = 'WrongCredentials',
  ExpiredLink = 'ExpiredLink'
}
