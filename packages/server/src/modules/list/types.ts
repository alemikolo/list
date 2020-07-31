import { User } from '@modules/user/types';

export enum ListStatus {
  ACTIVE = 'active',
  ARCHIVED = 'archived',
  DELETED = 'deleted'
}

export interface List {
  id: number;
  name: string;
  description?: string;
  status: ListStatus;
  creator: User;
  modifier: User;
}
