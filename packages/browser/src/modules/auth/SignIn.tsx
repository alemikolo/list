import React, { FC, useState, FormEvent } from 'react';

import { useSignInMutation } from './model/signIn';
import { InputChangeHandler } from '../../shared/constants/types';
import { setAccessToken } from './token';
import {
  CurrentUserDocument,
  CurrentUserQuery
} from '../user/model/currentUser';

export const SignIn: FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [signIn, { loading }] = useSignInMutation();
  const handleEmailChange: InputChangeHandler = event => {
    setEmail(event.target.value);
  };

  const handlePasswordChange: InputChangeHandler = event => {
    setPassword(event.target.value);
  };

  const handleSignUp = async (event: FormEvent): Promise<Boolean> => {
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
    }

    return false;
  };

  return loading ? (
    <div>loading...</div>
  ) : (
    <form onSubmit={handleSignUp}>
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
  );
};

export default SignIn;
