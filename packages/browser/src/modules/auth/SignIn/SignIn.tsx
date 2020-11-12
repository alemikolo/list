import React, { FC, useState, FormEvent } from 'react';
import { useHistory } from 'react-router-dom';

import { useSignInMutation } from '../model/signIn';
import { InputChangeHandler } from 'constants/types';
import { setAccessToken } from '../token';
import {
  CurrentUserDocument,
  CurrentUserQuery
} from 'modules/user/model/currentUser';
import { useAppState } from 'hooks';
import { setIsAuthenticated } from 'state';
import { Path } from 'router';
import './SignIn.scss';

export const SignIn: FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [signIn, { loading }] = useSignInMutation();
  const { dispatch } = useAppState();
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
    <div className="sign-in">
      {loading ? (
        <div>loading...</div>
      ) : (
        <form onSubmit={handleSignIn}>
          <div>
            <label>
              Email
              <input onChange={handleEmailChange} type="text" value={email} />
            </label>
          </div>
          <div>
            <label>
              Password
              <input
                onChange={handlePasswordChange}
                type="password"
                value={password}
              />
            </label>
          </div>
          <div>
            <button type="submit">Sign in</button>
          </div>
        </form>
      )}
    </div>
  );
};

export default SignIn;
