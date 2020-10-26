import { HttpLink } from '@apollo/client';

// import environment from '../../../../../env';

//const { GRAPHQL_URL } = environment;

const httpLink = new HttpLink({
  credentials: 'include',
  uri: 'http://localhost:5000/graphql'
});

export default httpLink;
