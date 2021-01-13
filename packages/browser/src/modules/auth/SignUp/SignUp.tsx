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
  const [registered, setRegistered] = useState(false);
  const [signUp, { error, loading }] = useSignUpMutation();

  const handleEmailChange: InputChangeHandler = event => {
    setEmail(event.target.value);
  };

  const handlePasswordChange: InputChangeHandler = event => {
    setPassword(event.target.value);
  };

  const handleSignUp = async (event: FormEvent): Promise<void> => {
    event.preventDefault();

    if (!email || !password) {
      return;
    }

    const response = await signUp({
      variables: { email, password }
    });

    if (response) {
      setRegistered(true);
    }
  };

  const [specificErrors = {}, OtherError] = error
    ? checkErrors([
        ErrorReason.AlreadyExistsError,
        ErrorReason.SendingFailedError
      ])(error)
    : [];
  const { AlreadyExistsError, SendingFailedError } = specificErrors;

  const handleReset = () => {
    setRegistered(false);
    setEmail('');
    setPassword('');
  };

  const success = !error && !loading && registered;

  return (
    <Page>
      {success ? (
        <div>
          <p>
            We have sent an email on address {email}. To finish sign up process
            use the link from the email message to confirm your registration{' '}
          </p>
          <p>
            <button onClick={handleReset}>Sign up again</button>
          </p>
        </div>
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
          {AlreadyExistsError && <div>User already exists</div>}
          {OtherError && <div>Something went wrong</div>}
          {SendingFailedError && (
            <div>
              Your account was created but sending confirmation email failed. If
              the email you entered: {email} is correct please use retry button.
              Otherwise try to sign up again.
              <button>Send</button>
            </div>
          )}
        </form>
      )}
    </Page>
  );
};

export default SignUp;
