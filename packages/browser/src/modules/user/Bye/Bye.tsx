import React, { FC } from 'react';

import { useByeQuery } from './byeQuery';
import Content from 'ui/Content';
import Loader, { LoaderSize } from 'ui/Loader';
import { ContentNotFound } from 'modules/notFound';

export const Bye: FC = () => {
  const { data, loading } = useByeQuery();

  if (loading) {
    return (
      <Content>
        <Loader size={LoaderSize.Big} />
      </Content>
    );
  }
  if (!data) {
    return <ContentNotFound />;
  }

  return <Content>{data.bye}</Content>;
};

export default Bye;
