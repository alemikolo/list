import React, { FC } from 'react';
import { ApolloError } from '@apollo/client';
import { FormattedMessage } from 'react-intl';

import { checkErrors } from 'errors';
import { ErrorReason } from 'errors/enums';
import { AsyncButton } from 'ui/Button';

import './ResendConfirmationView.scss';

interface ResendConfirmationViewProps {
  error?: ApolloError;
  loading: boolean;
  onClick: () => {};
}

const ResendConfirmationView: FC<ResendConfirmationViewProps> = ({
  error,
  loading,
  onClick
}) => {
  const [SendingFailedError, OtherError] = error
    ? checkErrors(ErrorReason.SendingFailedError)(error)
    : [];

  return (
    <div>
      {SendingFailedError && (
        <div>
          <FormattedMessage id="error.sending-confirmation-failed" />{' '}
          <FormattedMessage id="try again" />
        </div>
      )}
      <AsyncButton loading={loading} onClick={onClick}>
        <FormattedMessage id="resend-link" />
      </AsyncButton>
      {OtherError && (
        <div>
          <FormattedMessage id="error.general" />
        </div>
      )}
    </div>
  );
};

export default ResendConfirmationView;
