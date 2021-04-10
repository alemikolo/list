/* eslint-disable max-lines */
/* eslint-disable max-len */
/* eslint-disable max-lines-per-function */

import { gql } from '@apollo/client';
import * as React from 'react';
import * as Apollo from '@apollo/client';
import * as ApolloReactComponents from '@apollo/client/react/components';
import * as ApolloReactHoc from '@apollo/client/react/hoc';

import * as Types from '../../../constants/graphqlTypes';

export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K];
};
export type MakeOptional<T, K extends keyof T> = Omit<T, K> &
  { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> &
  { [SubKey in K]: Maybe<T[SubKey]> };
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
const defaultOptions = {};
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

export enum AccountStatus {
  Active = 'Active',
  Deleted = 'Deleted',
  Invited = 'Invited',
  Registered = 'Registered'
}

export type Activity = {
  __typename?: 'Activity';
  id: Scalars['String'];
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
  field?: Maybe<Scalars['String']>;
  messageId: Scalars['String'];
  newValue?: Maybe<Scalars['String']>;
  oldValue?: Maybe<Scalars['String']>;
  category: Category;
  task: Task;
  label: Label;
  stage: Stage;
  project: Project;
  organization: Organization;
  settings: Settings;
  user: User;
  performer: User;
};

export type Category = {
  __typename?: 'Category';
  id: Scalars['String'];
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
  color?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  icon?: Maybe<Icon>;
  name: Scalars['String'];
  locks: Lock;
  change: Activity;
  tasks: Task;
  creator: User;
  modifier: User;
};

export enum Icon {
  BreadIcon = 'BreadIcon',
  FoodIcon = 'FoodIcon',
  HomeIcon = 'HomeIcon',
  MeatIcon = 'MeatIcon',
  ToolIcon = 'ToolIcon',
  ToyIcon = 'ToyIcon',
  WorkIcon = 'WorkIcon'
}

export type Label = {
  __typename?: 'Label';
  id: Scalars['String'];
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
  color?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  icon?: Maybe<Icon>;
  name: Scalars['String'];
  change: Activity;
  locks: Lock;
  tasks: Task;
  creator: User;
  modifier: User;
};

export type Lock = {
  __typename?: 'Lock';
  id: Scalars['String'];
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
  field?: Maybe<Scalars['String']>;
  task: Task;
  stage: Stage;
  category: Category;
  label: Label;
  project: Project;
  user: User;
  organization: Organization;
};

export type Mutation = {
  __typename?: 'Mutation';
  forgotPassword: Scalars['Boolean'];
  signOut: Scalars['Boolean'];
  signIn: SignInResponse;
  signUp: Scalars['Boolean'];
  confirmSignUp: Scalars['Boolean'];
  resendSignUpConfirmation: Scalars['Boolean'];
  resetPassword: Scalars['Boolean'];
  retrySendingConfirmation: Scalars['Boolean'];
  updatePassword: Scalars['Boolean'];
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

export type MutationConfirmSignUpArgs = {
  tokenId: Scalars['String'];
};

export type MutationResendSignUpConfirmationArgs = {
  tokenId: Scalars['String'];
};

export type MutationResetPasswordArgs = {
  email: Scalars['String'];
};

export type MutationRetrySendingConfirmationArgs = {
  email: Scalars['String'];
};

export type MutationUpdatePasswordArgs = {
  passwordConfirmation: Scalars['String'];
  password: Scalars['String'];
  email: Scalars['String'];
  tokenId: Scalars['String'];
};

export type Organization = {
  __typename?: 'Organization';
  id: Scalars['String'];
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
  avatarUrl?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  name: Scalars['String'];
  status: Status;
  change: Activity;
  locks: Lock;
  creator: User;
  modifier: User;
  projects: Project;
  owners: User;
  admins: User;
  members: User;
  viewers: User;
};

export enum Priority {
  High = 'High',
  Low = 'Low',
  Normal = 'Normal',
  Urgent = 'Urgent'
}

export type Project = {
  __typename?: 'Project';
  id: Scalars['String'];
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
  description?: Maybe<Scalars['String']>;
  name: Scalars['String'];
  type: Type;
  status: Status;
  isFavorite: User;
  tasks: Task;
  change: Activity;
  stage: Stage;
  locks: Lock;
  creator: User;
  modifier: User;
  projects: Project;
  complexProjects: Project;
  organization: Organization;
  owners: User;
  admins: User;
  members: User;
  viewers: User;
};

export type Query = {
  __typename?: 'Query';
  hello: Scalars['String'];
  bye: Scalars['String'];
  users: Array<User>;
  currentUser?: Maybe<User>;
};

export type Settings = {
  __typename?: 'Settings';
  id: Scalars['String'];
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
  notification?: Maybe<Scalars['String']>;
  theme?: Maybe<Scalars['String']>;
  change: Activity;
};

export type SignInResponse = {
  __typename?: 'SignInResponse';
  user: User;
  accessToken: Scalars['String'];
};

export type Stage = {
  __typename?: 'Stage';
  id: Scalars['String'];
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
  description?: Maybe<Scalars['String']>;
  name: Scalars['String'];
  icon?: Maybe<Icon>;
  order: Scalars['Float'];
  change: Activity;
  locks: Lock;
  creator: User;
  modifier: User;
  project: Project;
  task: Task;
};

export enum Status {
  Active = 'Active',
  Archived = 'Archived',
  Deleted = 'Deleted'
}

export type Task = {
  __typename?: 'Task';
  id: Scalars['String'];
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
  description?: Maybe<Scalars['String']>;
  done: Scalars['Boolean'];
  name: Scalars['String'];
  priority: Priority;
  status: Status;
  change: Activity;
  locks: Lock;
  stage: Stage;
  category: Category;
  creator: User;
  performer: User;
  modifier: User;
  project: Project;
  labels: Label;
};

export type Token = {
  __typename?: 'Token';
  id: Scalars['String'];
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
};

export enum Type {
  Basic = 'Basic',
  Complex = 'Complex'
}

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
  taskModifier: Task;
  taskCreator: Task;
  taskPerformer: Task;
  orgCreator: Organization;
  orgModifier: Organization;
  stageCreator: Stage;
  stageModifier: Stage;
  projectCreator: Project;
  projectModifier: Project;
  locks: Lock;
  change: Activity;
  activity: Activity;
  token: Token;
  favorites: Project;
  projectOwner: Project;
  projectAdmin: Project;
  projectMember: Project;
  projectViewer: Project;
  organizationOwner: Organization;
  organizationAdmin: Organization;
  organizationMember: Organization;
  organizationViewer: Organization;
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
  const options = { ...defaultOptions, ...baseOptions };

  return Apollo.useQuery<ByeQuery, ByeQueryVariables>(ByeDocument, options);
}
export function useByeLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<ByeQuery, ByeQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };

  return Apollo.useLazyQuery<ByeQuery, ByeQueryVariables>(ByeDocument, options);
}
export type ByeQueryHookResult = ReturnType<typeof useByeQuery>;
export type ByeLazyQueryHookResult = ReturnType<typeof useByeLazyQuery>;
export type ByeQueryResult = Apollo.QueryResult<ByeQuery, ByeQueryVariables>;
