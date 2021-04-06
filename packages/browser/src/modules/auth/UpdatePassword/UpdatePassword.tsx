import React, { FC } from 'react';
import { useParams } from 'react-router-dom';

import Page from 'ui/Page';

interface RouteParams {
  tokenId: string;
}

const UpdatePassword: FC = () => {
  const { tokenId } = useParams<RouteParams>();

  return (
    <Page>
      <div>{tokenId}</div>
    </Page>
  );
};

export default UpdatePassword;
