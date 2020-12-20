import React, { FC, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { useConfirmSignUpMutation } from 'modules/auth/model/confirmSigUp';
import ResendSignUpConfirmation from 'modules/auth/ResendSignUpConfirmation';
import { checkAnyErrorExist, checkErrorReasonExist } from 'errors';
import { ErrorReason } from 'errors/enums';
import Page from 'ui/Page';

interface RouteParams {
  tokenId: string;
}

const SignUpConfirmation: FC = () => {
  const { tokenId } = useParams<RouteParams>();

  const [confirmSigUp, { error, loading }] = useConfirmSignUpMutation();

  useEffect(() => {
    confirmSigUp({ variables: { tokenId } });
  }, [confirmSigUp, tokenId]);

  const isLinkExpired = checkErrorReasonExist(ErrorReason.ExpiredLink)(error);

  const isAnyError = !isLinkExpired && checkAnyErrorExist(error);

  return (
    <Page>
      {loading && 'loading...'}
      {!loading && !error && 'You successfully confirm your email.'}
      {isLinkExpired && <ResendSignUpConfirmation />}
      {isAnyError && <div>Something went wrong</div>}
    </Page>
  );
};

export default SignUpConfirmation;
