/* eslint-disable no-console */
import React, { FC } from 'react';

import Header from '../Header';
import './Layout.scss';

const Layout: FC = ({ children }) => (
  <div className="layout">
    <Header />
    <main className="layout__content">
      <div>{children}</div>
    </main>
  </div>
);

export default Layout;
