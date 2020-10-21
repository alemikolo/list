import { Request, RequestHandler, Response } from 'express';

import { Crud } from '@shared/enums';

export type Route = {
  handlers: Array<RequestHandler>;
  method: Crud;
  path: string;
};

export type Routes = Array<Route>;

export interface JwtPayload {
  exp: number;
  iat: number;
  jwtid: string;
  userId: string;
  tokenVersion?: number;
}

export interface UserContext {
  userId: string;
}

export interface Context {
  req: Request;
  res: Response;
  user?: UserContext;
}
