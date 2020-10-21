/* eslint-disable max-lines */
/* eslint-disable max-len */
/* eslint-disable max-lines-per-function */

import { gql } from '@apollo/client';
import * as React from 'react';
import * as Apollo from '@apollo/client';
import * as ApolloReactComponents from '@apollo/client/react/components';
import * as ApolloReactHoc from '@apollo/client/react/hoc';

import * as Types from '../../../../shared/model/types';

export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K];
};
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** The javascript `Date` as string. Type represents date and time as the ISO Date string. */
  DateTime: any;
};

export type Query = {
  __typename?: 'Query';
  hello: Scalars['String'];
  bye: Scalars['String'];
  users: Array<User>;
  currentUser?: Maybe<User>;
};

export type User = {
  __typename?: 'User';
  id: Scalars['String'];
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
  activeAt?: Maybe<Scalars['DateTime']>;
  avatarUrl?: Maybe<Scalars['String']>;
  email: Scalars['String'];
  name?: Maybe<Scalars['String']>;
  status: AccountStatus;
  settings?: Maybe<Settings>;
  categoryCreator: Category;
  categoryModifier: Category;
  itemsModifier: Item;
  itemsCreator: Item;
  listsCreator: List;
  listsModifier: List;
  locks: Lock;
  change: Activity;
  activity: Activity;
  favorites: List;
  owner: List;
  editor: List;
  viewer: List;
};

export enum AccountStatus {
  Active = 'ACTIVE',
  Deleted = 'DELETED',
  Invited = 'INVITED',
  Registered = 'REGISTERED'
}

export type Settings = {
  __typename?: 'Settings';
  id: Scalars['String'];
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
  notification: Scalars['String'];
  theme: Scalars['String'];
  change: Activity;
};

export type Activity = {
  __typename?: 'Activity';
  id: Scalars['String'];
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
  field: Scalars['String'];
  messageId: Scalars['String'];
  newValue: Scalars['String'];
  oldValue: Scalars['String'];
  category: Category;
  item: Item;
  list: List;
  settings: Settings;
  user: User;
  performer: User;
};

export type Category = {
  __typename?: 'Category';
  id: Scalars['String'];
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
  color: Scalars['String'];
  description: Scalars['String'];
  icon: Icon;
  name: Scalars['String'];
  change: Activity;
  items: Item;
  creator: User;
  modifier: User;
};

export enum Icon {
  BreadIcon = 'BREAD_ICON',
  FoodIcon = 'FOOD_ICON',
  HomeIcon = 'HOME_ICON',
  MeatIcon = 'MEAT_ICON',
  ToolIcon = 'TOOL_ICON',
  ToyIcon = 'TOY_ICON',
  WorkIcon = 'WORK_ICON'
}

export type Item = {
  __typename?: 'Item';
  id: Scalars['String'];
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
  description: Scalars['String'];
  done: Scalars['Boolean'];
  link: Scalars['String'];
  name: Scalars['String'];
  priority: Priority;
  status: Status;
  change: Activity;
  locks: Lock;
  category: Category;
  creator: User;
  modifier: User;
  list: List;
};

export enum Priority {
  Important = 'IMPORTANT',
  Low = 'LOW',
  Normal = 'NORMAL'
}

export enum Status {
  Active = 'ACTIVE',
  Archived = 'ARCHIVED',
  Deleted = 'DELETED'
}

export type Lock = {
  __typename?: 'Lock';
  id: Scalars['String'];
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
  field: Scalars['String'];
  item: Item;
  list: List;
  user: User;
};

export type List = {
  __typename?: 'List';
  id: Scalars['String'];
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
  description: Scalars['String'];
  name: Scalars['String'];
  type: Type;
  status: Status;
  isFavorite: User;
  items: Item;
  change: Activity;
  locks: Lock;
  creator: User;
  modifier: User;
  lists: List;
  complexLists: List;
  owners: User;
  editors: User;
  viewers: User;
};

export enum Type {
  Basic = 'BASIC',
  Complex = 'COMPLEX'
}

export type Mutation = {
  __typename?: 'Mutation';
  forgotPassword: Scalars['Boolean'];
  signOut: Scalars['Boolean'];
  signIn: SignInResponse;
  signUp: Scalars['Boolean'];
};

export type MutationForgotPasswordArgs = {
  email: Scalars['String'];
};

export type MutationSignInArgs = {
  password: Scalars['String'];
  email: Scalars['String'];
};

export type MutationSignUpArgs = {
  password: Scalars['String'];
  email: Scalars['String'];
};

export type SignInResponse = {
  __typename?: 'SignInResponse';
  accessToken: Scalars['String'];
  user: User;
};

export type ByeQueryVariables = Types.Exact<{ [key: string]: never }>;

export type ByeQuery = { __typename?: 'Query' } & Pick<Types.Query, 'bye'>;

export const ByeDocument = gql`
  query Bye {
    bye
  }
`;
export type ByeComponentProps = Omit<
  ApolloReactComponents.QueryComponentOptions<ByeQuery, ByeQueryVariables>,
  'query'
>;

export const ByeComponent = (props: ByeComponentProps) => (
  <ApolloReactComponents.Query<ByeQuery, ByeQueryVariables>
    query={ByeDocument}
    {...props}
  />
);

export type ByeProps<TChildProps = {}, TDataName extends string = 'data'> = {
  [key in TDataName]: ApolloReactHoc.DataValue<ByeQuery, ByeQueryVariables>;
} &
  TChildProps;
export function withBye<
  TProps,
  TChildProps = {},
  TDataName extends string = 'data'
>(
  operationOptions?: ApolloReactHoc.OperationOption<
    TProps,
    ByeQuery,
    ByeQueryVariables,
    ByeProps<TChildProps, TDataName>
  >
) {
  return ApolloReactHoc.withQuery<
    TProps,
    ByeQuery,
    ByeQueryVariables,
    ByeProps<TChildProps, TDataName>
  >(ByeDocument, {
    alias: 'bye',
    ...operationOptions
  });
}

/**
 * __useByeQuery__
 *
 * To run a query within a React component, call `useByeQuery` and pass it any options that fit your needs.
 * When your component renders, `useByeQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useByeQuery({
 *   variables: {
 *   },
 * });
 */
export function useByeQuery(
  baseOptions?: Apollo.QueryHookOptions<ByeQuery, ByeQueryVariables>
) {
  return Apollo.useQuery<ByeQuery, ByeQueryVariables>(ByeDocument, baseOptions);
}
export function useByeLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<ByeQuery, ByeQueryVariables>
) {
  return Apollo.useLazyQuery<ByeQuery, ByeQueryVariables>(
    ByeDocument,
    baseOptions
  );
}
export type ByeQueryHookResult = ReturnType<typeof useByeQuery>;
export type ByeLazyQueryHookResult = ReturnType<typeof useByeLazyQuery>;
export type ByeQueryResult = Apollo.QueryResult<ByeQuery, ByeQueryVariables>;
