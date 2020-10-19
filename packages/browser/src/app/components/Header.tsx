import React, { FC } from 'react';
import { Link } from 'react-router-dom';

import {
  createDashboardRoute,
  createOrganizationsRoute,
  createSignInRoute,
  createSignUpRoute
} from '../../routes';
import { useCurrentUserQuery } from '../../modules/user/model/graphql/currentUser';

export const Header: FC = () => {
  const { data, error, loading } = useCurrentUserQuery({
    fetchPolicy: 'network-only'
  });

  const getEvents = (): void => {
    fetch('/api/lists/get', { method: 'GET' })
      .then(res => res.json())
      .then(json => console.error(json))
      .catch(err => console.error(err));
  };

  if (error) {
    console.error(error);

    return <div>{error.message}</div>;
  }

  const body = loading ? (
    <div>loading...</div>
  ) : data && data.currentUser ? (
    <div>You are logged in as: {data.currentUser.email}</div>
  ) : (
    <div>Not logged in</div>
  );

  return (
    <header className="layout__header">
      <h1>List App</h1>
      <p>Create your own list ęóąśłżźćń</p>
      <button onClick={getEvents} type="button">
        server test
      </button>
      <nav className="layout__navigation">
        <Link to={createDashboardRoute()}>Home</Link>
        <Link to={createSignInRoute()}>Sign in</Link>
        <Link to={createSignUpRoute()}>Sign up</Link>
        <Link to={createOrganizationsRoute()}>Bye</Link>
      </nav>
      <div>{body}</div>
    </header>
  );
};

export default Header;
