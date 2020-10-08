import React, { FC } from 'react';

import Layout from './components/Layout';
import { useHelloQuery } from './model/hello';

const App: FC = () => {
  const { loading, error, data } = useHelloQuery();

  if (loading || !data) {
    return <div>loading...</div>;
  }

  if (error) {
    return <div>{error.message}</div>;
  }

  return <Layout>{data.hello}</Layout>;
};

export default App;
