import React, { FC, useState, FormEvent } from 'react';

import { useSignUpMutation } from './model/graphql/signUp';
import { InputChangeHandler } from '../../shared/constants/types';

export const SignUp: FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [signUp, { loading }] = useSignUpMutation();
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
        <button type="submit">Sign Up</button>
      </div>
    </form>
  );
};

export default SignUp;
