import React, { FC, FormEvent, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';

import { useSignInMutation } from './useSignInMutation';
import { InputChangeHandler } from 'constants/types';
import { setAccessToken } from '../token';
import {
  CURRENT_USER,
  CurrentUserResponse
} from 'modules/user/CurrentUser/useCurrentUserQuery';
import { useAppDispatch } from 'hooks';
import { setIsAuthenticated } from 'state';
import { Path } from 'router';
import { checkErrors } from 'errors';
import { ErrorReason } from 'errors/enums';
import Page from 'ui/Page';
import { AsyncButton } from 'ui/Button';
import Loader, { LoaderSize } from 'ui/Loader';
import './SignIn.scss';

export const SignIn: FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [signIn, { error, loading }] = useSignInMutation();
  const dispatch = useAppDispatch();
  const history = useHistory();
  let generalErrorMessage;

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
        store.writeQuery<CurrentUserResponse>({
          data: { currentUser: data.signIn.user },
          query: CURRENT_USER
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

  const [specificErrors = {}, OtherError] = error
    ? checkErrors([
        ErrorReason.AccountNotConfirmedError,
        ErrorReason.InvalidCredentialsError
      ])(error)
    : [];
  const { AccountNotConfirmedError, InvalidCredentialsError } = specificErrors;

  if (AccountNotConfirmedError) {
    generalErrorMessage = 'error.account-not-confirmed';
  } else if (InvalidCredentialsError) {
    generalErrorMessage = 'error.invalid-credentials';
  } else if (OtherError) {
    generalErrorMessage = 'error.general';
  }

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
            <AsyncButton loading={loading} type="submit">
              <FormattedMessage id="sign-in" />
            </AsyncButton>
          </div>
          <div>
            <Link to={Path.ResetPassword}>
              <FormattedMessage id="password.forgot" />
            </Link>
          </div>
          {generalErrorMessage && (
            <div>
              <FormattedMessage id={generalErrorMessage} />
            </div>
          )}
        </form>
      )}
    </Page>
  );
};

export default SignIn;
