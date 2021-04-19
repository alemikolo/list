import { gql, MutationHookOptions, useMutation } from '@apollo/client';

type ChangePasswordResponse = {
  changePassword: {
    accessToken: string;
  };
};

interface ChangePasswordArgs {
  email: string;
  oldPassword: string;
  password: string;
  passwordConfirmation: string;
}

const CHANGE_PASSWORD = gql`
  mutation changePassword(
    $email: String!
    $oldPassword: String!
    $password: String!
    $passwordConfirmation: String!
  ) {
    changePassword(
      email: $email
      oldPassword: $oldPassword
      password: $password
      passwordConfirmation: $passwordConfirmation
    ) {
      accessToken
    }
  }
`;

export function useChangePasswordMutation(
  baseOptions?: MutationHookOptions<ChangePasswordResponse, ChangePasswordArgs>
) {
  const options = { ...baseOptions };

  return useMutation<ChangePasswordResponse, ChangePasswordArgs>(
    CHANGE_PASSWORD,
    options
  );
}
