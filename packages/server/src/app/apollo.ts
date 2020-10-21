import { ApolloServer } from 'apollo-server-express';
import { buildSchema } from 'type-graphql';

import environment from '@env/env';
import { UserResolver } from '@modules/user/resolver';

const { NODE_ENV } = environment;

export const startApollo = async (): Promise<ApolloServer> => {
  const schema = await buildSchema({
    resolvers: [UserResolver]
  });

  const server = new ApolloServer({
    context: ({ req, res }) => ({ req, res }),
    playground: NODE_ENV === 'development',
    schema
  });

  return server;
};
