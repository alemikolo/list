import { Crud, Routes } from '@shared/types';
import { getLists } from '@modules/list/controllers';

const { GET } = Crud;

const scope = '/api/lists';

const listRoutes: Routes = [
  { method: GET, path: `${scope}/get`, handlers: [getLists] }
];

export default listRoutes;
