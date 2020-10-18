/* eslint-disable no-console */
import React, { FC } from 'react';
import { Link } from 'react-router-dom';

import {
  createDashboardRoute,
  createOrganizationsRoute,
  createSignInRoute,
  createSignUpRoute
} from '../../../routes';
import './Layout.scss';

const getEvents = (): void => {
  fetch('/api/lists/get', { method: 'GET' })
    .then(res => res.json())
    .then(json => console.log(json))
    .catch(err => console.log(err));
};

const Layout: FC = ({ children }) => (
  <div className="layout">
    <header className="layout__header">
      <h1>List App</h1>
      <p>Create your own list ęóąśłżźćń</p>
      <button onClick={getEvents} type="button">
        server test
      </button>
    </header>
    <nav className="layout__navigation">
      <Link to={createDashboardRoute()}>Home</Link>
      <Link to={createSignInRoute()}>Sign in</Link>
      <Link to={createSignUpRoute()}>Sign up</Link>
      <Link to={createOrganizationsRoute()}>Bye</Link>
    </nav>
    <main className="layout__content">
      <div>{children}</div>
    </main>
  </div>
);

export default Layout;
