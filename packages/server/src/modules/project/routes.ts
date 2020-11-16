import { Crud } from '@shared/enums';
import { Routes } from '@shared/types';
import { getProjects } from '@modules/project/controllers';

const { Get } = Crud;

const scope = '/api/projects';

const projectRoutes: Routes = [
  { handlers: [getProjects], method: Get, path: `${scope}/get` }
];

export default projectRoutes;
