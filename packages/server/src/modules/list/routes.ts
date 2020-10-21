import { Crud } from '@shared/enums';
import { Routes } from '@shared/types';
import { getLists } from '@modules/list/controllers';

const { GET } = Crud;

const scope = '/api/lists';

const listRoutes: Routes = [
  { handlers: [getLists], method: GET, path: `${scope}/get` }
];

export default listRoutes;
