import { onError } from '@apollo/client/link/error';

const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors && graphQLErrors.length > 0) {
    //TODO
  }

  if (networkError) {
    // TODO
  }
});

export default errorLink;
