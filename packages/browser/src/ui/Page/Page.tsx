import React, { FC } from 'react';

import './Page.scss';

const Page: FC = ({ children }) => {
  return <main className="page">{children}</main>;
};

export default Page;
