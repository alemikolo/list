import { Crud } from '@shared/enums';
import { Routes } from '@shared/types';
import { refreshToken } from './controllers';

const { POST } = Crud;

const scope = '/api/auth';

const userRoutes: Routes = [
  { handlers: [refreshToken], method: POST, path: `${scope}/refresh-token` }
];

export default userRoutes;
