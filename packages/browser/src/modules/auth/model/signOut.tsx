/* eslint-disable max-lines */
/* eslint-disable max-len */
/* eslint-disable max-lines-per-function */

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
import * as React from 'react';
import * as ApolloReactComponents from '@apollo/client/react/components';
import * as ApolloReactHoc from '@apollo/client/react/hoc';

import * as Types from '../../../constants/graphqlTypes';

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
  refreshToken: Scalars['String'];
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

export enum AccountStatus {
  Active = 'Active',
  Deleted = 'Deleted',
  Invited = 'Invited',
  Registered = 'Registered'
}

export type Settings = {
  __typename?: 'Settings';
  id: Scalars['String'];
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
  notification?: Maybe<Scalars['String']>;
  theme?: Maybe<Scalars['String']>;
  change: Activity;
};

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

export enum Priority {
  High = 'High',
  Low = 'Low',
  Normal = 'Normal',
  Urgent = 'Urgent'
}

export enum Status {
  Active = 'Active',
  Archived = 'Archived',
  Deleted = 'Deleted'
}

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

export enum Type {
  Basic = 'Basic',
  Complex = 'Complex'
}

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
  user: User;
  accessToken: Scalars['String'];
};

export type SignOutMutationVariables = Types.Exact<{ [key: string]: never }>;

export type SignOutMutation = { __typename?: 'Mutation' } & Pick<
  Types.Mutation,
  'signOut'
>;

export const SignOutDocument = gql`
  mutation signOut {
    signOut
  }
`;
export type SignOutMutationFn = Apollo.MutationFunction<
  SignOutMutation,
  SignOutMutationVariables
>;
export type SignOutComponentProps = Omit<
  ApolloReactComponents.MutationComponentOptions<
    SignOutMutation,
    SignOutMutationVariables
  >,
  'mutation'
>;

export const SignOutComponent = (props: SignOutComponentProps) => (
  <ApolloReactComponents.Mutation<SignOutMutation, SignOutMutationVariables>
    mutation={SignOutDocument}
    {...props}
  />
);

export type SignOutProps<
  TChildProps = {},
  TDataName extends string = 'mutate'
> = {
  [key in TDataName]: Apollo.MutationFunction<
    SignOutMutation,
    SignOutMutationVariables
  >;
} &
  TChildProps;
export function withSignOut<
  TProps,
  TChildProps = {},
  TDataName extends string = 'mutate'
>(
  operationOptions?: ApolloReactHoc.OperationOption<
    TProps,
    SignOutMutation,
    SignOutMutationVariables,
    SignOutProps<TChildProps, TDataName>
  >
) {
  return ApolloReactHoc.withMutation<
    TProps,
    SignOutMutation,
    SignOutMutationVariables,
    SignOutProps<TChildProps, TDataName>
  >(SignOutDocument, {
    alias: 'signOut',
    ...operationOptions
  });
}

/**
 * __useSignOutMutation__
 *
 * To run a mutation, you first call `useSignOutMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSignOutMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [signOutMutation, { data, loading, error }] = useSignOutMutation({
 *   variables: {
 *   },
 * });
 */
export function useSignOutMutation(
  baseOptions?: Apollo.MutationHookOptions<
    SignOutMutation,
    SignOutMutationVariables
  >
) {
  return Apollo.useMutation<SignOutMutation, SignOutMutationVariables>(
    SignOutDocument,
    baseOptions
  );
}
export type SignOutMutationHookResult = ReturnType<typeof useSignOutMutation>;
export type SignOutMutationResult = Apollo.MutationResult<SignOutMutation>;
export type SignOutMutationOptions = Apollo.BaseMutationOptions<
  SignOutMutation,
  SignOutMutationVariables
>;
