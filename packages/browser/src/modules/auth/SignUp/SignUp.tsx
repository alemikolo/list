import React, { FC, FormEvent, useState } from 'react';

import { useSignUpMutation } from '../model/signUp';
import RetrySendingConfirmation from 'modules/auth/RetrySendingConfirmation';
import { InputChangeHandler } from 'constants/types';
import { checkErrors } from 'errors';
import { ErrorReason } from 'errors/enums';
import Page from 'ui/Page';
import { AsyncButton, Button } from 'ui/Button';

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

  const handleReset = () => {
    setRegistered(false);
    setEmail('');
    setPassword('');
  };

  const [specificErrors = {}, OtherError] = error
    ? checkErrors([
        ErrorReason.AlreadyExistsError,
        ErrorReason.SendingFailedError
      ])(error)
    : [];
  const { AlreadyExistsError, SendingFailedError } = specificErrors;

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
            <Button onClick={handleReset}>Sign up again</Button>
          </p>
        </div>
      ) : SendingFailedError ? (
        <RetrySendingConfirmation email={email} />
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
            <AsyncButton loading={loading} type="submit">
              Sign Up
            </AsyncButton>
          </div>
          {AlreadyExistsError && <div>User already exists</div>}
          {OtherError && <div>Something went wrong</div>}
        </form>
      )}
      )
    </Page>
  );
};

export default SignUp;
