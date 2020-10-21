import React, { FC } from 'react';

import { useByeQuery } from './model/graphql/bye';

export const Bye: FC = () => {
  const { data, error, loading } = useByeQuery({ fetchPolicy: 'network-only' });

  if (error) {
    return <div>{error.message}</div>;
  }

  if (loading) {
    return <div>loading...</div>;
  }
  if (!data) {
    return <div>no data</div>;
  }

  return <div>{data.bye}</div>;
};

export default Bye;
