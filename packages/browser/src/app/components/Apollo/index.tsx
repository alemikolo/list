import React, { FC } from 'react';
import {
  ApolloClient,
  ApolloProvider,
  createHttpLink,
  InMemoryCache
} from '@apollo/client';

import environment from '../../../env';

const { GRAPHQL_URL } = environment;

const cache = new InMemoryCache();
const link = createHttpLink({
  uri: GRAPHQL_URL
});

const client = new ApolloClient({ cache, link });

const Apollo: FC = ({ children }) => (
  <ApolloProvider client={client}>{children}</ApolloProvider>
);

export default Apollo;
