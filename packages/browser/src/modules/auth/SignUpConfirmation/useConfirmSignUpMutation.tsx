import { gql, MutationHookOptions, useMutation } from '@apollo/client';

type ConfirmSignUpResponse = boolean;

interface ConfirmSignUpArgs {
  tokenId: string;
}

const CONFIRM_SIGN_UP = gql`
  mutation retrySendingConfirmation($email: String!) {
    retrySendingConfirmation(email: $email)
  }
`;

export function useConfirmSignUpMutation(
  baseOptions?: MutationHookOptions<ConfirmSignUpResponse, ConfirmSignUpArgs>
) {
  const options = { ...baseOptions };

  return useMutation<ConfirmSignUpResponse, ConfirmSignUpArgs>(
    CONFIRM_SIGN_UP,
    options
  );
}
