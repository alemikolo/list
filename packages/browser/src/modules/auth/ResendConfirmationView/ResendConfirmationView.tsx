import React, { FC } from 'react';
import { ApolloError } from '@apollo/client';

import { checkErrors } from 'errors';
import { ErrorReason } from 'errors/enums';

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
        <div>Sending confirmation email failed. Please try again.</div>
      )}
      <button onClick={onClick}>
        {loading ? '...' : 'resend confirmation link'}
      </button>
      {OtherError && <div>Something went wrong</div>}
    </div>
  );
};

export default ResendConfirmationView;
