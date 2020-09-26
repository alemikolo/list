import { Crud } from '@shared/enums';
import { Routes } from '@shared/types';
import { refreshToken } from '@modules/user/controllers';

const { POST } = Crud;

const scope = '/api/auth';

const userRoutes: Routes = [
  { method: POST, path: `${scope}/refresh-token`, handlers: [refreshToken] }
];

export default userRoutes;
