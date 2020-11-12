import React, { FC } from 'react';

import './Content.scss';

const Content: FC = ({ children }) => {
  return <main className="content">{children}</main>;
};

export default Content;
