/* eslint-disable no-console */
import React, { FC } from 'react';

import './Layout.scss';

const getEvents = (): void => {
  fetch('/api/lists/get', { method: 'GET' })
    .then(res => res.json())
    .then(json => console.log(json))
    .catch(err => console.log(err));
};

const Layout: FC = () => (
  <div className="layout">
    <h1>List App</h1>
    <p>Create your own list ęóąśłżźćń</p>
    <button type="button" onClick={getEvents}>
      server test
    </button>
  </div>
);

export default Layout;
