import React, { FC, FormEvent, useState } from 'react';

import { useResetPasswordMutation } from '../model/resetPassword';
import { InputChangeHandler } from 'constants/types';
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
        </form>
      )}
    </Page>
  );
};

export default ResetPassword;
