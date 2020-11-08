/* eslint-disable no-console */
import React, { FC } from 'react';

import './Layout.scss';

const Layout: FC = ({ children }) => (
  <div className="layout">
    <main className="layout__content">{children}</main>
  </div>
);

export default Layout;
