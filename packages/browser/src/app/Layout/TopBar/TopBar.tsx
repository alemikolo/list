import React, { FC } from 'react';
import { FormattedMessage } from 'react-intl';

import { useCurrentUserQuery } from 'modules/user/CurrentUser/currentUserQuery';
import { useSignOutMutation } from 'modules/auth/SignOut/signOutMutation';
import { setAccessToken } from 'modules/auth/token';
import { useAppDispatch } from 'hooks';
import { setIsAuthenticated } from 'state';
import Loader, { LoaderSize } from 'ui/Loader';

import './TopBar.scss';

const TopBar: FC = () => {
  const { data, loading } = useCurrentUserQuery();
  const [signout, { client }] = useSignOutMutation();
  const dispatch = useAppDispatch();

  const body = loading ? (
    <div>
      <Loader size={LoaderSize.Big} />
    </div>
  ) : data && data.currentUser ? (
    <div>{data.currentUser.email}</div>
  ) : (
    <div>
      {' '}
      <FormattedMessage id="not-signed-in" />
    </div>
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
        <h1>
          <FormattedMessage id="app-name" />
        </h1>
      </div>
      <div className="top-bar__user">
        {data?.currentUser?.email && (
          <button onClick={handleSignOut}>
            <FormattedMessage id="sign-out" />
          </button>
        )}
        <div>{body}</div>
      </div>
    </div>
  );
};

export default TopBar;
