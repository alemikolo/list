import { ApolloLink } from '@apollo/client';

import { errorLink, httpLink, refreshTokenLink, requestLink } from './links';

const link = ApolloLink.from([
  refreshTokenLink,
  errorLink,
  requestLink,
  httpLink
]);

export default link;
