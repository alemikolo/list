import { gql, MutationHookOptions, useMutation } from '@apollo/client';

type ResendSignUpConfirmationResponse = boolean;

interface ResendSignUpConfirmationArgs {
  tokenId: string;
}

const RESEND_SIGN_UP_CONFIRM = gql`
  mutation resendSignUpConfirmation($tokenId: String!) {
    resendSignUpConfirmation(tokenId: $tokenId)
  }
`;

export function useResendSignUpConfirmationMutation(
  baseOptions?: MutationHookOptions<
    ResendSignUpConfirmationResponse,
    ResendSignUpConfirmationArgs
  >
) {
  const options = { ...baseOptions };

  return useMutation<
    ResendSignUpConfirmationResponse,
    ResendSignUpConfirmationArgs
  >(RESEND_SIGN_UP_CONFIRM, options);
}
