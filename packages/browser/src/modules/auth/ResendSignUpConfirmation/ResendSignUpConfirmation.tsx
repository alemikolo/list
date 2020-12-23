import React, { FC } from 'react';
import { useParams } from 'react-router-dom';

import { useResendSignUpConfirmationMutation } from 'modules/auth/model/resendSignUpConfirmation';
import { checkErrors } from 'errors';
import { ErrorReason } from 'errors/enums';

interface ResendSignUpConfirmationProps {
  email?: string;
}
interface RouteParams {
  tokenId: string;
}

const ResendSignUpConfirmation: FC<ResendSignUpConfirmationProps> = () => {
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

  const [SendingFailedError, OtherError] = error
    ? checkErrors(ErrorReason.SendingFailedError)(error)
    : [];

  return (
    <div>
      {SendingFailedError && (
        <div>Sending email failed. Please try again. </div>
      )}
      <button onClick={handleResendConfirmationLink}>
        {loading ? '...' : 'resend confirmation link'}
      </button>
      {OtherError && <div>Something went wrong</div>}
    </div>
  );
};

export default ResendSignUpConfirmation;
