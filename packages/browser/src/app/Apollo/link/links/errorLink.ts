import { onError } from '@apollo/client/link/error';

const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors && graphQLErrors.length > 0) {
    console.error(graphQLErrors);
  }

  if (networkError) {
    console.error(networkError);
  }
});

export default errorLink;
