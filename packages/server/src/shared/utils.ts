import { registerEnumType } from 'type-graphql';

export const registerEnumTypes = (enums: [object, string][]) =>
  enums.forEach(([enumObject, name]) => registerEnumType(enumObject, { name }));
