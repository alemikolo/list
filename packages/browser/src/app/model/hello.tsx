/* eslint-disable max-lines */
/* eslint-disable max-len */

import { gql } from '@apollo/client';
import * as React from 'react';
import * as Apollo from '@apollo/client';
import * as ApolloReactComponents from '@apollo/client/react/components';
import * as ApolloReactHoc from '@apollo/client/react/hoc';

import * as Types from '../../shared/model/types';

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
};

export type User = {
  __typename?: 'User';
  activeAt: Scalars['DateTime'];
  avatarUrl: Scalars['String'];
  email: Scalars['String'];
  name: Scalars['String'];
  status: AccountStatus;
  settings: Settings;
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
  notification: Scalars['String'];
  theme: Scalars['String'];
  change: Activity;
};

export type Activity = {
  __typename?: 'Activity';
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
  field: Scalars['String'];
  item: Item;
  list: List;
  user: User;
};

export type List = {
  __typename?: 'List';
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
  logout: Scalars['Boolean'];
  login: LoginResponse;
  signUp: Scalars['Boolean'];
};

export type MutationForgotPasswordArgs = {
  email: Scalars['String'];
};

export type MutationLoginArgs = {
  password: Scalars['String'];
  email: Scalars['String'];
};

export type MutationSignUpArgs = {
  password: Scalars['String'];
  email: Scalars['String'];
};

export type LoginResponse = {
  __typename?: 'LoginResponse';
  accessToken: Scalars['String'];
};

export type HelloQueryVariables = Types.Exact<{ [key: string]: never }>;

export type HelloQuery = { __typename?: 'Query' } & Pick<Types.Query, 'hello'>;

export const HelloDocument = gql`
  query Hello {
    hello
  }
`;
export type HelloComponentProps = Omit<
  ApolloReactComponents.QueryComponentOptions<HelloQuery, HelloQueryVariables>,
  'query'
>;

export const HelloComponent = (props: HelloComponentProps) => (
  <ApolloReactComponents.Query<HelloQuery, HelloQueryVariables>
    query={HelloDocument}
    {...props}
  />
);

export type HelloProps<TChildProps = {}, TDataName extends string = 'data'> = {
  [key in TDataName]: ApolloReactHoc.DataValue<HelloQuery, HelloQueryVariables>;
} &
  TChildProps;
export function withHello<
  TProps,
  TChildProps = {},
  TDataName extends string = 'data'
>(
  operationOptions?: ApolloReactHoc.OperationOption<
    TProps,
    HelloQuery,
    HelloQueryVariables,
    HelloProps<TChildProps, TDataName>
  >
) {
  return ApolloReactHoc.withQuery<
    TProps,
    HelloQuery,
    HelloQueryVariables,
    HelloProps<TChildProps, TDataName>
  >(HelloDocument, {
    alias: 'hello',
    ...operationOptions
  });
}

/**
 * __useHelloQuery__
 *
 * To run a query within a React component, call `useHelloQuery` and pass it any options that fit your needs.
 * When your component renders, `useHelloQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useHelloQuery({
 *   variables: {
 *   },
 * });
 */
export function useHelloQuery(
  baseOptions?: Apollo.QueryHookOptions<HelloQuery, HelloQueryVariables>
) {
  return Apollo.useQuery<HelloQuery, HelloQueryVariables>(
    HelloDocument,
    baseOptions
  );
}
export function useHelloLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<HelloQuery, HelloQueryVariables>
) {
  return Apollo.useLazyQuery<HelloQuery, HelloQueryVariables>(
    HelloDocument,
    baseOptions
  );
}
export type HelloQueryHookResult = ReturnType<typeof useHelloQuery>;
export type HelloLazyQueryHookResult = ReturnType<typeof useHelloLazyQuery>;
export type HelloQueryResult = Apollo.QueryResult<
  HelloQuery,
  HelloQueryVariables
>;
