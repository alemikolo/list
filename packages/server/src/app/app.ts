import bodyParser from 'body-parser';
import cors from 'cors';
import express, { Application, Router } from 'express';
import path from 'path';

import apolloServer from '@app/apollo';
import { Routes } from '@shared/types';
import listRoutes from '@modules/list/routes';

type RoutesCreator = (routes: Routes) => Router;
type RouterCreator = (router: Router) => RoutesCreator;

const createRouter: RouterCreator = (router: Router): RoutesCreator => (
  routes: Routes
) => {
  routes.forEach(({ handlers, method, path }) => {
    router[method](path, ...handlers);
  });

  return router;
};

const useRoutes = createRouter(Router());

const startApp = (app: Application): Application => {
  app.use(cors({ credentials: true, origin: true }));
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: false }));

  app.use(useRoutes([...listRoutes]));

  apolloServer.applyMiddleware({ app });

  app.use('*', (_, res) => res.sendFile(path.resolve('public/index.html')));

  return app;
};

export default startApp(express());
