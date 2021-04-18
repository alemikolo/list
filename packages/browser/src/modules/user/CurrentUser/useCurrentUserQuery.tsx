import { gql, QueryHookOptions, useQuery } from '@apollo/client';

import { User } from '../types';

type CurrentUserResponse = { currentUser: User };

type CurrentUserArgs = {};

const CURRENT_USER = gql`
  query CurrentUser {
    currentUser {
      email
      id
      name
    }
  }
`;

export function useCurrentUserQuery(
  baseOptions?: QueryHookOptions<CurrentUserResponse, CurrentUserArgs>
) {
  const options = { ...baseOptions };

  return useQuery<CurrentUserResponse, CurrentUserArgs>(CURRENT_USER, options);
}
