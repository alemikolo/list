import { gql, QueryHookOptions, useQuery } from '@apollo/client';

type ByeResponse = { bye: string };

type ByeArgs = {};

const BYE = gql`
  query Bye {
    bye
  }
`;

export function useByeQuery(
  baseOptions?: QueryHookOptions<ByeResponse, ByeArgs>
) {
  const options = { ...baseOptions };

  return useQuery<ByeResponse, ByeArgs>(BYE, options);
}
