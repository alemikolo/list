import React, { FC, FormEvent, useState } from 'react';
import { FormattedMessage } from 'react-intl';

import { useChangePasswordMutation } from './useChangePasswordMutation';
import { InputChangeHandler } from 'constants/types';
import { setAccessToken } from '../token';
import { checkErrors } from 'errors';
import { ErrorReason } from 'errors/enums';
import { AsyncButton } from 'ui/Button';

const ChangePassword: FC = () => {
  const [email, setEmail] = useState('');
  const [oldPassword, setOldPassword] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');
  const [changed, setChanged] = useState(false);
  const [changePassword, { error, loading }] = useChangePasswordMutation();
  let generalErrorMessage;

  const handleEmailChange: InputChangeHandler = event => {
    setEmail(event.target.value);
  };

  const handleOldPasswordChange: InputChangeHandler = event => {
    setOldPassword(event.target.value);
  };

  const handlePasswordChange: InputChangeHandler = event => {
    setPassword(event.target.value);
  };

  const handlePasswordConfirmationChange: InputChangeHandler = event => {
    setPasswordConfirmation(event.target.value);
  };

  const handleChangePassword = async (event: FormEvent): Promise<void> => {
    event.preventDefault();

    if (
      !email ||
      !oldPassword ||
      !password ||
      !passwordConfirmation ||
      password !== passwordConfirmation
    ) {
      return;
    }

    const response = await changePassword({
      variables: { email, oldPassword, password, passwordConfirmation }
    });

    if (response && response.data) {
      setAccessToken(response.data.changePassword.accessToken);
      setChanged(true);
      setEmail('');
      setPassword('');
      setOldPassword('');
      setPasswordConfirmation('');
    }
  };

  const [specificErrors = {}, OtherError] = error
    ? checkErrors([
        ErrorReason.InvalidCredentialsError,
        ErrorReason.PasswordMismatch
      ])(error)
    : [];
  const { InvalidCredentialsError, PasswordMismatch } = specificErrors;

  if (InvalidCredentialsError) {
    generalErrorMessage = 'error.invalid-credentials';
  } else if (OtherError) {
    generalErrorMessage = 'error.general';
  }

  const success = !error && !loading && changed;

  return success ? (
    <div>
      <p>
        <FormattedMessage id="auth.password-changed" />
      </p>
    </div>
  ) : (
    <form onSubmit={handleChangePassword}>
      <div>
        <label>
          <FormattedMessage id="email" />
          <input onChange={handleEmailChange} type="text" value={email} />
        </label>
      </div>
      <div>
        <label>
          <FormattedMessage id="password.old" />
          <input
            onChange={handleOldPasswordChange}
            type="password"
            value={oldPassword}
          />
        </label>
      </div>
      <div>
        <label>
          <FormattedMessage id="password.new" />
          <input
            onChange={handlePasswordChange}
            type="password"
            value={password}
          />
        </label>
      </div>
      <div>
        <label>
          <FormattedMessage id="password.confirm" />
          <input
            onChange={handlePasswordConfirmationChange}
            type="password"
            value={passwordConfirmation}
          />
        </label>
        {PasswordMismatch && (
          <div>
            <FormattedMessage id="error.password.mismatch" />
          </div>
        )}
      </div>
      <div>
        <AsyncButton loading={loading} type="submit">
          <FormattedMessage id="save" />
        </AsyncButton>
      </div>
      {generalErrorMessage && (
        <div>
          <FormattedMessage id={generalErrorMessage} />
        </div>
      )}
    </form>
  );
};

export default ChangePassword;
