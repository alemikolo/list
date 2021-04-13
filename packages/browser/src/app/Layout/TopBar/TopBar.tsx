import React, { FC } from 'react';

import { useCurrentUserQuery } from 'modules/user/model/currentUser';
import { useSignOutMutation } from 'modules/auth/model/signOut';
import { setAccessToken } from 'modules/auth/token';
import { useAppDispatch } from 'hooks';
import { setIsAuthenticated } from 'state';

import './TopBar.scss';

const TopBar: FC = () => {
  const { data, loading } = useCurrentUserQuery();
  const [signout, { client }] = useSignOutMutation();
  const dispatch = useAppDispatch();

  const body = loading ? (
    <div>loading...</div>
  ) : data && data.currentUser ? (
    <div>{data.currentUser.email}</div>
  ) : (
    <div>Not logged in</div>
  );

  const handleSignOut = async () => {
    await signout();

    setAccessToken();

    await client.clearStore();

    dispatch(setIsAuthenticated(false));

    window.location.reload();
  };

  return (
    <div className="top-bar">
      <div className="top-bar__logo">
        <h1>Handle It</h1>
      </div>
      <div className="top-bar__user">
        {data?.currentUser?.email && (
          <button onClick={handleSignOut}>sign out</button>
        )}
        <div>{body}</div>
      </div>
    </div>
  );
};

export default TopBar;
