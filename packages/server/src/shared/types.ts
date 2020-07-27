import { RequestHandler } from 'express';

export enum Crud {
  DELETE = 'delete',
  GET = 'get',
  PATCH = 'patch',
  POST = 'post'
}

export interface Route {
  handlers: Array<RequestHandler>;
  method: Crud;
  path: string;
}

export type Routes = Array<Route>;
