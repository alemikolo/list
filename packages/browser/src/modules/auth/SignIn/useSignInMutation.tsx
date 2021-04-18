import { gql, MutationHookOptions, useMutation } from '@apollo/client';

import { User } from 'modules/user/types';

type SignInResponse = {
  signIn: {
    user: User;
    accessToken: string;
  };
};

interface SignInArgs {
  email: string;
  password: string;
}

const SIGN_IN = gql`
  mutation signIn($email: String!, $password: String!) {
    signIn(email: $email, password: $password) {
      accessToken
      user {
        email
        id
        name
      }
    }
  }
`;

export function useSignInMutation(
  baseOptions?: MutationHookOptions<SignInResponse, SignInArgs>
) {
  const options = { ...baseOptions };

  return useMutation<SignInResponse, SignInArgs>(SIGN_IN, options);
}
