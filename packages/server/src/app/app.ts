import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import { Application, Router } from 'express';
import path from 'path';

import { startApollo } from '@app/apollo';
import { Routes } from '@shared/types';
import listRoutes from '@modules/list/routes';
import userRoutes from '@modules/user/routes';

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
  app.use(cookieParser());
  app.use(bodyParser.urlencoded({ extended: false }));

  app.use(useRoutes([...listRoutes, ...userRoutes]));

  const apollo = await startApollo();

  apollo.applyMiddleware({ app });

  app.use('*', (_, res) => res.sendFile(path.resolve('public/index.html')));

  return app;
};

export default startApp;
