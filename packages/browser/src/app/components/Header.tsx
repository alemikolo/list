import React, { FC } from 'react';
import { Link } from 'react-router-dom';

import {
  createDashboardRoute,
  createOrganizationsRoute,
  createSignInRoute,
  createSignUpRoute
} from '../../routes';
import { useCurrentUserQuery } from '../../modules/user/model/graphql/currentUser';
import { useSignOutMutation } from '../../modules/user/model/graphql/signOut';
import { setAccessToken } from '../../modules/auth/token';

export const Header: FC = () => {
  const { data, loading } = useCurrentUserQuery();
  const [signout, { client }] = useSignOutMutation();

  const getEvents = (): void => {
    fetch('/api/lists/get', { method: 'GET' })
      .then(res => res.json())
      .then(json => console.error(json))
      .catch(err => console.error(err));
  };

  const body = loading ? (
    <div>loading...</div>
  ) : data && data.currentUser ? (
    <div>You are logged in as: {data.currentUser.email}</div>
  ) : (
    <div>Not logged in</div>
  );

  const handleSignOut = async () => {
    await signout();

    setAccessToken('');

    await client.clearStore();

    window.location.reload();
  };

  return (
    <header className="layout__header">
      <h1>Handle It</h1>
      <p>Create your own project ęóąśłżźćń</p>
      <button onClick={getEvents} type="button">
        server test
      </button>
      {data?.currentUser?.email && (
        <button onClick={handleSignOut}>sign out</button>
      )}
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
