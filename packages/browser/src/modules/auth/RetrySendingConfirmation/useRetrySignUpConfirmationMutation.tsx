import { gql, MutationHookOptions, useMutation } from '@apollo/client';

type RetrySignUpConfirmationResponse = boolean;

interface RetrySignUpConfirmationArgs {
  email: string;
}

const RETRY_SIGN_UP_CONFIRM = gql`
  mutation retrySendingConfirmation($email: String!) {
    retrySendingConfirmation(email: $email)
  }
`;

export function useRetrySignUpConfirmationMutation(
  baseOptions?: MutationHookOptions<
    RetrySignUpConfirmationResponse,
    RetrySignUpConfirmationArgs
  >
) {
  const options = { ...baseOptions };

  return useMutation<
    RetrySignUpConfirmationResponse,
    RetrySignUpConfirmationArgs
  >(RETRY_SIGN_UP_CONFIRM, options);
}
