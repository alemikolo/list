import { Settings } from '@modules/settings/types';

export enum AccountStatus {
  ACTIVE = 'active',
  DELETED = 'deleted',
  INVITED = 'invited'
}

export interface User {
  id: number;
  activeAt: Date;
  avatarUrl?: string;
  email: string;
  hashedEmail?: string;
  name: string;
  password?: string;
  provider?: string;
  status: AccountStatus;
  settings: Settings;
}
