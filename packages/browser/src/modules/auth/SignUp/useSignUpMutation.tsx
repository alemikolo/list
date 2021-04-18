import { gql, MutationHookOptions, useMutation } from '@apollo/client';

type SignUpResponse = boolean;

interface SignUpArgs {
  email: string;
  password: string;
  passwordConfirmation: string;
}

const SIGN_UP = gql`
  mutation signUp(
    $email: String!
    $password: String!
    $passwordConfirmation: String!
  ) {
    signUp(
      email: $email
      password: $password
      passwordConfirmation: $passwordConfirmation
    )
  }
`;

export function useSignUpMutation(
  baseOptions?: MutationHookOptions<SignUpResponse, SignUpArgs>
) {
  const options = { ...baseOptions };

  return useMutation<SignUpResponse, SignUpArgs>(SIGN_UP, options);
}
