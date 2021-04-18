import { gql, MutationHookOptions, useMutation } from '@apollo/client';

type SignOutResponse = boolean;

type SignOutArgs = {};

const SIGN_OUT = gql`
  mutation signOut {
    signOut
  }
`;

export function useSignOutMutation(
  baseOptions?: MutationHookOptions<SignOutResponse, SignOutArgs>
) {
  const options = { ...baseOptions };

  return useMutation<SignOutResponse, SignOutArgs>(SIGN_OUT, options);
}
