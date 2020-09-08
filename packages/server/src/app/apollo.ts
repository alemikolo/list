import { ApolloServer } from 'apollo-server-express';

import environment from '../environment';

const { NODE_ENV } = environment;

const apolloServer = new ApolloServer({
  playground: NODE_ENV === 'development',
  typeDefs: `
  type Query {
    hello: String!
  }
  `,
  resolvers: {
    Query: {
      hello: () => 'hello world'
    }
  }
});

export default apolloServer;
