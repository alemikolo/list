import { HttpLink } from '@apollo/client';

import environment from '../../../../../env';

const { GRAPHQL_URL } = environment;

const httpLink = new HttpLink({
  credentials: 'include',
  uri: GRAPHQL_URL
});

export default httpLink;
