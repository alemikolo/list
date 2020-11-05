import React, { FC } from 'react';

import { useCurrentUserQuery } from 'modules/user/model/currentUser';
import { useSignOutMutation } from 'modules/auth/model/signOut';
import { setAccessToken } from 'modules/auth/token';

const TopBar: FC = () => {
  const { data, loading } = useCurrentUserQuery();
  const [signout, { client }] = useSignOutMutation();

  const body = loading ? (
    <div>loading...</div>
  ) : data && data.currentUser ? (
    <div>You are logged in as: {data.currentUser.email}</div>
  ) : (
    <div>Not logged in</div>
  );

  const handleSignOut = async () => {
    await signout();

    setAccessToken();

    await client.clearStore();

    window.location.reload();
  };

  return (
    <>
      <h1>Handle It</h1>
      {data?.currentUser?.email && (
        <button onClick={handleSignOut}>sign out</button>
      )}
      <div>{body}</div>
    </>
  );
};

export default TopBar;
