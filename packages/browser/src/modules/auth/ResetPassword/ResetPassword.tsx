import React, { FC, FormEvent, useState } from 'react';
import { FormattedMessage } from 'react-intl';

import { useResetPasswordMutation } from '../model/resetPassword.generated';
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
            <FormattedMessage id="password.reset.success" values={{ email }} />
          </p>
        </div>
      ) : (
        <form onSubmit={handleResetPassword}>
          <div>
            <label>
              <FormattedMessage id="email" />
              <input onChange={handleEmailChange} type="text" value={email} />
            </label>
          </div>
          <div>
            <AsyncButton loading={loading} type="submit">
              <FormattedMessage id="password.reset" />
            </AsyncButton>
          </div>
          {OtherError && (
            <div>
              <FormattedMessage id="error.general" />
            </div>
          )}
          {SendingFailedError && (
            <div>
              <FormattedMessage id="error.sending-confirmation-failed" />{' '}
              <FormattedMessage id="try again" />
            </div>
          )}
        </form>
      )}
    </Page>
  );
};

export default ResetPassword;
