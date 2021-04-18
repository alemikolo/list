import React, { FC } from 'react';
import { FormattedMessage } from 'react-intl';

import { useRetrySignUpConfirmationMutation } from './useRetrySignUpConfirmationMutation';
import ResendConfirmationView from 'modules/auth/ResendConfirmationView';

interface RetrySendingConfirmationProps {
  email: string;
}

const RetrySendingConfirmation: FC<RetrySendingConfirmationProps> = ({
  email
}) => {
  const [
    retrySendingConfirmation,
    { error, loading }
  ] = useRetrySignUpConfirmationMutation();

  const handleRetrySendingConfirmation = async (): Promise<Boolean> => {
    const response = await retrySendingConfirmation({
      variables: { email }
    });

    if (response) {
      return true;
    }

    return false;
  };

  return (
    <div>
      <div>
        <FormattedMessage id="sign-up.confirmation.retry" values={{ email }} />
      </div>
      <ResendConfirmationView
        error={error}
        loading={loading}
        onClick={handleRetrySendingConfirmation}
      />
    </div>
  );
};

export default RetrySendingConfirmation;
