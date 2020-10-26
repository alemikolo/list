import { Crud } from '@shared/enums';
import { Routes } from '@shared/types';
import { getProjects } from '@modules/project/controllers';

const { GET } = Crud;

const scope = '/api/projects';

const projectRoutes: Routes = [
  { handlers: [getProjects], method: GET, path: `${scope}/get` }
];

export default projectRoutes;
