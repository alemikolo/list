import { gql, MutationHookOptions, useMutation } from '@apollo/client';

type UpdatePasswordResponse = boolean;

interface UpdatePasswordArgs {
  email: string;
  password: string;
  passwordConfirmation: string;
  tokenId: string;
}

const UPDATE_PASSWORD = gql`
  mutation updatePassword(
    $tokenId: String!
    $email: String!
    $password: String!
    $passwordConfirmation: String!
  ) {
    updatePassword(
      tokenId: $tokenId
      email: $email
      password: $password
      passwordConfirmation: $passwordConfirmation
    )
  }
`;

export function useUpdatePasswordMutation(
  baseOptions?: MutationHookOptions<UpdatePasswordResponse, UpdatePasswordArgs>
) {
  const options = { ...baseOptions };

  return useMutation<UpdatePasswordResponse, UpdatePasswordArgs>(
    UPDATE_PASSWORD,
    options
  );
}
