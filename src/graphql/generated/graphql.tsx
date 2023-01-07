import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K];
};
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]?: Maybe<T[SubKey]>;
};
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]: Maybe<T[SubKey]>;
};
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  DateTime: any;
};

export type AuthInput = {
  email: Scalars['String'];
  password: Scalars['String'];
};

export type AuthModel = {
  __typename?: 'AuthModel';
  token: Scalars['String'];
  user: User;
};

export type CreateUserInput = {
  birdDate: Scalars['DateTime'];
  email: Scalars['String'];
  gender: Gender;
  name: Scalars['String'];
  password: Scalars['String'];
  phone: Scalars['String'];
  role: Role;
};

export enum Gender {
  F = 'F',
  M = 'M',
}

export type Mutation = {
  __typename?: 'Mutation';
  createUser: User;
  deleteUser: Scalars['Boolean'];
  login: AuthModel;
  updateUser: User;
};

export type MutationCreateUserArgs = {
  data: CreateUserInput;
};

export type MutationDeleteUserArgs = {
  id: Scalars['String'];
};

export type MutationLoginArgs = {
  data: AuthInput;
};

export type MutationUpdateUserArgs = {
  data: UpdateUserInput;
  id: Scalars['String'];
};

export type Query = {
  __typename?: 'Query';
  userByEmail: User;
  userById: User;
  userByRole: Array<User>;
  users: Array<User>;
};

export type QueryUserByEmailArgs = {
  email: Scalars['String'];
};

export type QueryUserByIdArgs = {
  id: Scalars['String'];
};

export type QueryUserByRoleArgs = {
  role: Scalars['String'];
};

export enum Role {
  Architect = 'ARCHITECT',
  Client = 'CLIENT',
}

export type UpdateUserInput = {
  birdDate?: InputMaybe<Scalars['DateTime']>;
  gender?: InputMaybe<Gender>;
  name?: InputMaybe<Scalars['String']>;
  password: Scalars['String'];
  phone?: InputMaybe<Scalars['String']>;
  role?: InputMaybe<Role>;
};

export type User = {
  __typename?: 'User';
  birdDate: Scalars['DateTime'];
  createdAt: Scalars['DateTime'];
  email: Scalars['String'];
  gender: Gender;
  id: Scalars['ID'];
  name: Scalars['String'];
  password: Scalars['String'];
  phone: Scalars['String'];
  role: Role;
  updatedAt: Scalars['DateTime'];
};

export type GetUsersQueryVariables = Exact<{ [key: string]: never }>;

export type GetUsersQuery = {
  __typename?: 'Query';
  users: Array<{
    __typename?: 'User';
    id: string;
    name: string;
    email: string;
    phone: string;
    role: Role;
    gender: Gender;
    birdDate: any;
    createdAt: any;
    updatedAt: any;
  }>;
};

export const GetUsersDocument = gql`
  query GetUsers {
    users {
      id
      name
      email
      phone
      role
      gender
      birdDate
      createdAt
      updatedAt
    }
  }
`;

/**
 * __useGetUsersQuery__
 *
 * To run a query within a React component, call `useGetUsersQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetUsersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetUsersQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetUsersQuery(
  baseOptions?: Apollo.QueryHookOptions<GetUsersQuery, GetUsersQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<GetUsersQuery, GetUsersQueryVariables>(
    GetUsersDocument,
    options,
  );
}
export function useGetUsersLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GetUsersQuery,
    GetUsersQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<GetUsersQuery, GetUsersQueryVariables>(
    GetUsersDocument,
    options,
  );
}
export type GetUsersQueryHookResult = ReturnType<typeof useGetUsersQuery>;
export type GetUsersLazyQueryHookResult = ReturnType<
  typeof useGetUsersLazyQuery
>;
export type GetUsersQueryResult = Apollo.QueryResult<
  GetUsersQuery,
  GetUsersQueryVariables
>;
