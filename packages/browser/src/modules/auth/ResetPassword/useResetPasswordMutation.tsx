import { gql, MutationHookOptions, useMutation } from '@apollo/client';

type ResetPasswordResponse = boolean;

interface ResetPasswordArgs {
  email: string;
}

const RESET_PASSWORD = gql`
  mutation resetPassword($email: String!) {
    resetPassword(email: $email)
  }
`;

export function useResetPasswordMutation(
  baseOptions?: MutationHookOptions<ResetPasswordResponse, ResetPasswordArgs>
) {
  const options = { ...baseOptions };

  return useMutation<ResetPasswordResponse, ResetPasswordArgs>(
    RESET_PASSWORD,
    options
  );
}
