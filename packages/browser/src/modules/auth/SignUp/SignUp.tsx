import React, { FC, useState, FormEvent } from 'react';

import { useSignUpMutation } from '../model/signUp';
import { InputChangeHandler } from 'constants/types';
import { checkErrors } from 'errors';
import { ErrorReason } from 'errors/enums';
import Page from 'ui/Page';
import './SignUp.scss';

export const SignUp: FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [signUp, { error, loading }] = useSignUpMutation();

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

    const response = await signUp({
      variables: { email, password }
    });

    if (response) {
      return true;
    }

    return false;
  };

  const [isUserExist, isOtherError] = error
    ? checkErrors(ErrorReason.AlreadyExists)(error)
    : [];

  return (
    <Page>
      {loading ? (
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
            <button type="submit">Sign Up</button>
          </div>
          {isUserExist && <div>User already exists</div>}
          {isOtherError && <div>Something went wrong</div>}
        </form>
      )}
    </Page>
  );
};

export default SignUp;
