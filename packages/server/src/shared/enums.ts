import { registerEnumTypes } from '@shared/utils';

export enum AccountStatus {
  ACTIVE = 'active',
  DELETED = 'deleted',
  INVITED = 'invited',
  REGISTERED = 'registered'
}

export enum Icon {
  BREAD_ICON = 'BreadIcon',
  FOOD_ICON = 'FoodIcon',
  HOME_ICON = 'HomeIcon',
  MEAT_ICON = 'MeatIcon',
  TOOL_ICON = 'ToolIcon',
  TOY_ICON = 'ToyIcon',
  WORK_ICON = 'WorkIcon'
}

export enum Crud {
  DELETE = 'delete',
  GET = 'get',
  PATCH = 'patch',
  POST = 'post'
}

export enum Priority {
  IMPORTANT = 'Important',
  LOW = 'low',
  NORMAL = 'Normal'
}

export enum Status {
  ACTIVE = 'active',
  ARCHIVED = 'archived',
  DELETED = 'deleted'
}

export enum Type {
  BASIC = 'Basic',
  COMPLEX = 'Complex'
}

registerEnumTypes([
  [AccountStatus, 'AccountStatus'],
  [Icon, 'Icon'],
  [Priority, 'Priority'],
  [Status, 'Status'],
  [Type, 'Type']
]);
