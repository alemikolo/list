import React, { FC } from 'react';

import { useRetrySendingConfirmationMutation } from 'modules/auth/model/retrySendingConfirmation';
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
  ] = useRetrySendingConfirmationMutation();

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
    <ResendConfirmationView
      error={error}
      loading={loading}
      onClick={handleRetrySendingConfirmation}
    />
  );
};

export default RetrySendingConfirmation;
