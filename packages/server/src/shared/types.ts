import { Request, RequestHandler, Response } from 'express';

import { Crud } from '@shared/enums';

export type Route = {
  handlers: Array<RequestHandler>;
  method: Crud;
  path: string;
};

export type Routes = Array<Route>;

export interface UserContext {
  userId: string;
}

export type Locale = 'en' | 'pl';

export interface Context {
  req: Request;
  res: Response;
  user?: UserContext;
}
