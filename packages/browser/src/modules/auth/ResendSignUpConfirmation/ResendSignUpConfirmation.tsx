import React, { FC } from 'react';
import { useParams } from 'react-router-dom';

import { useResendSignUpConfirmationMutation } from 'modules/auth/model/resendSignUpConfirmation';
import { checkErrors } from 'errors';

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

  const [, isOtherError] = error ? checkErrors()(error) : [];

  return (
    <div>
      <button onClick={handleResendConfirmationLink}>
        {loading ? '...' : 'resend confirmation link'}
      </button>
      {isOtherError && <div>Something went wrong</div>}
    </div>
  );
};

export default ResendSignUpConfirmation;
