import React, { FC, FormEvent, useState } from 'react';
import { Link, useParams } from 'react-router-dom';

import { useUpdatePasswordMutation } from '../model/updatePassword';
import { InputChangeHandler } from 'constants/types';
import { checkErrors } from 'errors';
import { ErrorReason } from 'errors/enums';
import { Path } from 'router';
import Page from 'ui/Page';
import { AsyncButton } from 'ui/Button';

interface RouteParams {
  tokenId: string;
}

const UpdatePassword: FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');
  const [updated, setUpdated] = useState(false);
  const [updatePassword, { error, loading }] = useUpdatePasswordMutation();
  const { tokenId } = useParams<RouteParams>();

  const handleEmailChange: InputChangeHandler = event => {
    setEmail(event.target.value);
  };

  const handlePasswordChange: InputChangeHandler = event => {
    setPassword(event.target.value);
  };

  const handlePasswordConfirmationChange: InputChangeHandler = event => {
    setPasswordConfirmation(event.target.value);
  };

  const handleUpdatePassword = async (event: FormEvent): Promise<void> => {
    event.preventDefault();

    if (
      !email ||
      !password ||
      !passwordConfirmation ||
      password !== passwordConfirmation
    ) {
      return;
    }

    const response = await updatePassword({
      variables: { tokenId, email, password, passwordConfirmation }
    });

    if (response) {
      setUpdated(true);
    }
  };

  const [specificErrors = {}, OtherError] = error
    ? checkErrors([ErrorReason.ExpiredLinkError, ErrorReason.PasswordMismatch])(
        error
      )
    : [];
  const { ExpiredLinkError, PasswordMismatch } = specificErrors;

  const success = !error && !loading && updated;

  return (
    <Page>
      {success ? (
        <div>
          <p>Your password has been updated.</p>
          <p>
            <Link to={Path.SignIn}>Sign in</Link>
          </p>
        </div>
      ) : (
        <form onSubmit={handleUpdatePassword}>
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
            <label>
              Password
              <input
                onChange={handlePasswordConfirmationChange}
                type="password"
                value={passwordConfirmation}
              />
            </label>
            {PasswordMismatch && <div>Passwords does not match</div>}
          </div>
          <div>
            <AsyncButton loading={loading} type="submit">
              Save
            </AsyncButton>
          </div>
          {OtherError && <div>Something went wrong</div>}
          {ExpiredLinkError && (
            <div>
              Sending confirmation email failed. Please try to send request
              again. <Link to={Path.ResetPassword}>Reset password</Link>
            </div>
          )}
        </form>
      )}
    </Page>
  );
};

export default UpdatePassword;
