import bodyParser from 'body-parser';
import cors from 'cors';
import { Application, Router } from 'express';
import path from 'path';

import { startApollo } from '@app/apollo';
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

const startApp = async (app: Application): Promise<Application> => {
  app.use(cors({ credentials: true, origin: true }));
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: false }));

  app.use(useRoutes([...listRoutes]));

  const apollo = await startApollo();

  apollo.applyMiddleware({ app });

  app.use('*', (_, res) => res.sendFile(path.resolve('public/index.html')));

  return app;
};

export default startApp;
