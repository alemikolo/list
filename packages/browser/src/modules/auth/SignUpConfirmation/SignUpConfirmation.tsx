import React, { FC, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';

import { useConfirmSignUpMutation } from 'modules/auth/model/confirmSigUp';
import ResendSignUpConfirmation from 'modules/auth/ResendSignUpConfirmation';
import { checkErrors } from 'errors';
import { ErrorReason } from 'errors/enums';
import Page from 'ui/Page';
import Loader, { LoaderSize } from 'ui/Loader';

interface RouteParams {
  tokenId: string;
}

const SignUpConfirmation: FC = () => {
  const { tokenId } = useParams<RouteParams>();

  const [confirmSigUp, { error, loading }] = useConfirmSignUpMutation();

  useEffect(() => {
    confirmSigUp({ variables: { tokenId } });
  }, [confirmSigUp, tokenId]);

  const [ExpiredLinkError, OtherError] = error
    ? checkErrors(ErrorReason.ExpiredLinkError)(error)
    : [];

  return (
    <Page>
      {loading && <Loader size={LoaderSize.Big} />}
      {!loading && !error && (
        <FormattedMessage id="sign-up.confirmation.success" />
      )}
      {ExpiredLinkError && <ResendSignUpConfirmation />}
      {OtherError && (
        <div>
          <FormattedMessage id="error.general" />
        </div>
      )}
    </Page>
  );
};

export default SignUpConfirmation;
