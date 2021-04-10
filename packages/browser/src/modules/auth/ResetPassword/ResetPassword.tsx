import React, { FC, FormEvent, useState } from 'react';

import { useResetPasswordMutation } from '../model/resetPassword';
import { InputChangeHandler } from 'constants/types';
import { checkErrors } from 'errors';
import { ErrorReason } from 'errors/enums';
import Page from 'ui/Page';
import { AsyncButton } from 'ui/Button';

const ResetPassword: FC = () => {
  const [email, setEmail] = useState('');
  const [resetEmailSent, setResetEmailSent] = useState(false);
  const [resetPassword, { error, loading }] = useResetPasswordMutation();

  const handleEmailChange: InputChangeHandler = event => {
    setEmail(event.target.value);
  };

  const handleResetPassword = async (event: FormEvent): Promise<void> => {
    event.preventDefault();

    if (!email) {
      return;
    }
    const response = await resetPassword({
      variables: { email }
    });
    console.error(response);

    if (response) {
      setResetEmailSent(true);
    }
  };
  if (error) {
    console.error(error);
  }

  const [specificErrors = {}, OtherError] = error
    ? checkErrors([ErrorReason.SendingFailedError])(error)
    : [];
  const { SendingFailedError } = specificErrors;

  const success = !error && !loading && resetEmailSent;

  return (
    <Page>
      {success ? (
        <div>
          <p>
            We have sent an email on address {email}. To reset your password use
            the link from the email message.
          </p>
        </div>
      ) : (
        <form onSubmit={handleResetPassword}>
          <div>
            <label>
              Email
              <input onChange={handleEmailChange} type="text" value={email} />
            </label>
          </div>
          <div>
            <AsyncButton loading={loading} type="submit">
              Reset password
            </AsyncButton>
          </div>
          {OtherError && <div>Something went wrong</div>}
          {SendingFailedError && (
            <div>
              Sending confirmation email failed. Check if the entered email:{' '}
              {email} is correct and try to send request again.
            </div>
          )}
        </form>
      )}
    </Page>
  );
};

export default ResetPassword;
