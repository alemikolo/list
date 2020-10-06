import React, { FC } from 'react';
import { gql, useQuery } from '@apollo/client';

import Layout from './components/Layout';

const App: FC = () => {
  const query = gql`
    {
      hello
    }
  `;
  const { loading, error, data } = useQuery(query);

  if (loading) {
    return <div>loading...</div>;
  }

  if (error) {
    return <div>{error.message}</div>;
  }

  return <Layout>{data.hello}</Layout>;
};

export default App;
