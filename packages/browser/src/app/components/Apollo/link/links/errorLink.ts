import { onError } from '@apollo/client/link/error';

const errorLink = onError(({ graphQLErrors, networkError }) => {
  //TODO logout | redirect | etc
  console.error(graphQLErrors);
  console.error(networkError);
});

export default errorLink;
