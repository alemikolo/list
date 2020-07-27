import { Request, Response, RequestHandler } from 'express';

export const getLists: RequestHandler = (
  req: Request,
  res: Response
): Response =>
  res.send({
    baseUrl: req.baseUrl,
    host: req.hostname,
    protocol: req.protocol,
    origin: req.originalUrl,
    route: req.route,
    path: req.path
  });
