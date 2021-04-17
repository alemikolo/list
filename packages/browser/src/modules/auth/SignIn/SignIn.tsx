import React, { FC, FormEvent, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';

import { useSignInMutation } from '../model/signIn.generated';
import { InputChangeHandler } from 'constants/types';
import { setAccessToken } from '../token';
import {
  CurrentUserDocument,
  CurrentUserQuery
} from 'modules/user/model/currentUser.generated';
import { useAppDispatch } from 'hooks';
import { setIsAuthenticated } from 'state';
import { Path } from 'router';
import Page from 'ui/Page';
import Loader, { LoaderSize } from 'ui/Loader';
import './SignIn.scss';

export const SignIn: FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [signIn, { loading }] = useSignInMutation();
  const dispatch = useAppDispatch();
  const history = useHistory();

  const handleEmailChange: InputChangeHandler = event => {
    setEmail(event.target.value);
  };

  const handlePasswordChange: InputChangeHandler = event => {
    setPassword(event.target.value);
  };

  const handleSignIn = async (event: FormEvent): Promise<Boolean> => {
    event.preventDefault();

    if (!email || !password) {
      return false;
    }

    const response = await signIn({
      update: (store, { data }) => {
        if (!data) {
          return null;
        }
        store.writeQuery<CurrentUserQuery>({
          data: { currentUser: data.signIn.user },
          query: CurrentUserDocument
        });
      },
      variables: { email, password }
    });

    if (response && response.data) {
      setAccessToken(response.data.signIn.accessToken);
      dispatch(setIsAuthenticated(true));
      history.replace(Path.Dashboard);
    }

    return false;
  };

  return (
    <Page>
      {loading ? (
        <Loader size={LoaderSize.Big} />
      ) : (
        <form onSubmit={handleSignIn}>
          <div>
            <label>
              <FormattedMessage id="email" />
              <input onChange={handleEmailChange} type="text" value={email} />
            </label>
          </div>
          <div>
            <label>
              <FormattedMessage id="password" />
              <input
                onChange={handlePasswordChange}
                type="password"
                value={password}
              />
            </label>
          </div>
          <div>
            <button type="submit">
              <FormattedMessage id="sign-in" />
            </button>
          </div>
          <div>
            <Link to={Path.ResetPassword}>
              <FormattedMessage id="password.forgot" />
            </Link>
          </div>
        </form>
      )}
    </Page>
  );
};

export default SignIn;
