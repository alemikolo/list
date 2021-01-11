import React, { FC } from 'react';
import { useParams } from 'react-router-dom';

import { useResendSignUpConfirmationMutation } from 'modules/auth/model/resendSignUpConfirmation';
import ResendConfirmationView from 'modules/auth/ResendConfirmationView';

interface RouteParams {
  tokenId: string;
}

const ResendSignUpConfirmation: FC = () => {
  const { tokenId } = useParams<RouteParams>();

  const [
    resendSignUpConfirmation,
    { error, loading }
  ] = useResendSignUpConfirmationMutation();

  const handleResendConfirmationLink = async (): Promise<Boolean> => {
    const response = await resendSignUpConfirmation({
      variables: { tokenId }
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
      onClick={handleResendConfirmationLink}
    />
  );
};

export default ResendSignUpConfirmation;
