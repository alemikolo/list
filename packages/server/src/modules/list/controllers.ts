import { Request, Response, RequestHandler } from 'express';

export const getLists: RequestHandler = (
  req: Request,
  res: Response
): Response =>
  res.send({
    baseUrl: req.baseUrl,
    host: req.hostname,
    origin: req.originalUrl,
    path: req.path,
    protocol: req.protocol,
    route: req.route
  });
