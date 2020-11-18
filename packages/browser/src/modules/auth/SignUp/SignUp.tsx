import React, { FC, useState, FormEvent } from 'react';
import { ApolloError } from '@apollo/client';

import { useSignUpMutation } from '../model/signUp';
import { InputChangeHandler } from 'constants/types';
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

  const getErrors = (error: ApolloError) => {
    if (!error) {
      return [];
    }

    return error.graphQLErrors.map(({ message, extensions = {} }) => {
      const { exception } = extensions;

      return { message, ...exception };
    });
  };

  return (
    <div className="sign-in">
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
          {error && (
            <div>
              {getErrors(error).map(({ message, reason, status, type }) => (
                <p key={message}>
                  <span key={1}>{type}</span>
                  <span key={2}>{message}</span>
                  <span key={3}>{status}</span>
                  <span key={4}>{reason}</span>
                </p>
              ))}
            </div>
          )}
        </form>
      )}
    </div>
  );
};

export default SignUp;
