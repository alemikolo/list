import React, { FC } from 'react';
import { ApolloClient, ApolloProvider } from '@apollo/client';

import cache from './cache';
import link from './link';

const client = new ApolloClient({
  cache,
  defaultOptions: {
    mutate: {
      errorPolicy: 'ignore'
    },
    query: {
      errorPolicy: 'ignore'
    }
  },
  link
});

const Apollo: FC = ({ children }) => (
  <ApolloProvider client={client}>{children}</ApolloProvider>
);

export default Apollo;
