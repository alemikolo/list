import React, { FC } from 'react';

import { useByeQuery } from '../model/bye';
import Content from 'ui/Content';

export const Bye: FC = () => {
  const { data, loading } = useByeQuery();

  if (loading) {
    return <Content>loading...</Content>;
  }
  if (!data) {
    return <Content>no data</Content>;
  }

  return <Content>{data.bye}</Content>;
};

export default Bye;
