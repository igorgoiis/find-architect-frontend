import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
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

export type CreateServiceRequestInput = {
  aRequestId?: InputMaybe<Scalars['String']>;
  cRequestId?: InputMaybe<Scalars['String']>;
  description: Scalars['String'];
  status: StatusService;
  title: Scalars['String'];
};

export type CreateUserInput = {
  bio: Scalars['String'];
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
  M = 'M'
}

export type Mutation = {
  __typename?: 'Mutation';
  createServiceRequest: ServiceRequest;
  createUser: User;
  deleteUser: Scalars['Boolean'];
  login: AuthModel;
  removeServiceRequest: ServiceRequest;
  updateServiceRequest: ServiceRequest;
  updateUser: User;
};


export type MutationCreateServiceRequestArgs = {
  data: CreateServiceRequestInput;
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


export type MutationRemoveServiceRequestArgs = {
  id: Scalars['String'];
};


export type MutationUpdateServiceRequestArgs = {
  data: UpdateServiceRequestInput;
  id: Scalars['String'];
};


export type MutationUpdateUserArgs = {
  data: UpdateUserInput;
  id: Scalars['String'];
};

export type Query = {
  __typename?: 'Query';
  findAllServiceRequest: Array<ServiceRequest>;
  findOneServiceRequest: ServiceRequest;
  userByEmail: User;
  userById: User;
  userByRole: Array<User>;
  users: Array<User>;
};


export type QueryFindOneServiceRequestArgs = {
  id: Scalars['String'];
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
  Client = 'CLIENT'
}

export type ServiceRequest = {
  __typename?: 'ServiceRequest';
  aRequestId?: Maybe<Scalars['String']>;
  cRequestId?: Maybe<Scalars['String']>;
  description: Scalars['String'];
  id: Scalars['ID'];
  status: StatusService;
  title: Scalars['String'];
};

export enum StatusService {
  Accepted = 'ACCEPTED',
  Declined = 'DECLINED',
  Requested = 'REQUESTED'
}

export type UpdateServiceRequestInput = {
  description: Scalars['String'];
  status: StatusService;
  title: Scalars['String'];
};

export type UpdateUserInput = {
  bio?: InputMaybe<Scalars['String']>;
  birdDate?: InputMaybe<Scalars['DateTime']>;
  gender?: InputMaybe<Gender>;
  name?: InputMaybe<Scalars['String']>;
  password?: InputMaybe<Scalars['String']>;
  phone?: InputMaybe<Scalars['String']>;
  role?: InputMaybe<Role>;
};

export type User = {
  __typename?: 'User';
  bio: Scalars['String'];
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

export type CreateServiceRequestMutationVariables = Exact<{
  data: CreateServiceRequestInput;
}>;


export type CreateServiceRequestMutation = { __typename?: 'Mutation', createServiceRequest: { __typename?: 'ServiceRequest', id: string, title: string, description: string, status: StatusService, cRequestId?: string | null, aRequestId?: string | null } };

export type CreateUserMutationVariables = Exact<{
  data: CreateUserInput;
}>;


export type CreateUserMutation = { __typename?: 'Mutation', createUser: { __typename?: 'User', id: string } };

export type LoginMutationVariables = Exact<{
  data: AuthInput;
}>;


export type LoginMutation = { __typename?: 'Mutation', login: { __typename?: 'AuthModel', token: string, user: { __typename?: 'User', id: string, name: string, email: string, phone: string, role: Role, gender: Gender, birdDate: any, createdAt: any, updatedAt: any } } };

export type GetAllUsersQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAllUsersQuery = { __typename?: 'Query', users: Array<{ __typename?: 'User', id: string }> };

export type GetUserByIdQueryVariables = Exact<{
  id: Scalars['String'];
}>;


export type GetUserByIdQuery = { __typename?: 'Query', userById: { __typename?: 'User', id: string, name: string, bio: string, email: string, phone: string, gender: Gender, role: Role, birdDate: any, createdAt: any, updatedAt: any } };

export type GetUserByRoleQueryVariables = Exact<{
  role: Scalars['String'];
}>;


export type GetUserByRoleQuery = { __typename?: 'Query', userByRole: Array<{ __typename?: 'User', id: string, name: string, bio: string }> };


export const CreateServiceRequestDocument = gql`
    mutation CreateServiceRequest($data: CreateServiceRequestInput!) {
  createServiceRequest(data: $data) {
    id
    title
    description
    status
    cRequestId
    aRequestId
  }
}
    `;
export type CreateServiceRequestMutationFn = Apollo.MutationFunction<CreateServiceRequestMutation, CreateServiceRequestMutationVariables>;

/**
 * __useCreateServiceRequestMutation__
 *
 * To run a mutation, you first call `useCreateServiceRequestMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateServiceRequestMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createServiceRequestMutation, { data, loading, error }] = useCreateServiceRequestMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useCreateServiceRequestMutation(baseOptions?: Apollo.MutationHookOptions<CreateServiceRequestMutation, CreateServiceRequestMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateServiceRequestMutation, CreateServiceRequestMutationVariables>(CreateServiceRequestDocument, options);
      }
export type CreateServiceRequestMutationHookResult = ReturnType<typeof useCreateServiceRequestMutation>;
export type CreateServiceRequestMutationResult = Apollo.MutationResult<CreateServiceRequestMutation>;
export type CreateServiceRequestMutationOptions = Apollo.BaseMutationOptions<CreateServiceRequestMutation, CreateServiceRequestMutationVariables>;
export const CreateUserDocument = gql`
    mutation CreateUser($data: CreateUserInput!) {
  createUser(data: $data) {
    id
  }
}
    `;
export type CreateUserMutationFn = Apollo.MutationFunction<CreateUserMutation, CreateUserMutationVariables>;

/**
 * __useCreateUserMutation__
 *
 * To run a mutation, you first call `useCreateUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createUserMutation, { data, loading, error }] = useCreateUserMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useCreateUserMutation(baseOptions?: Apollo.MutationHookOptions<CreateUserMutation, CreateUserMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateUserMutation, CreateUserMutationVariables>(CreateUserDocument, options);
      }
export type CreateUserMutationHookResult = ReturnType<typeof useCreateUserMutation>;
export type CreateUserMutationResult = Apollo.MutationResult<CreateUserMutation>;
export type CreateUserMutationOptions = Apollo.BaseMutationOptions<CreateUserMutation, CreateUserMutationVariables>;
export const LoginDocument = gql`
    mutation Login($data: AuthInput!) {
  login(data: $data) {
    user {
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
    token
  }
}
    `;
export type LoginMutationFn = Apollo.MutationFunction<LoginMutation, LoginMutationVariables>;

/**
 * __useLoginMutation__
 *
 * To run a mutation, you first call `useLoginMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLoginMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [loginMutation, { data, loading, error }] = useLoginMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useLoginMutation(baseOptions?: Apollo.MutationHookOptions<LoginMutation, LoginMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument, options);
      }
export type LoginMutationHookResult = ReturnType<typeof useLoginMutation>;
export type LoginMutationResult = Apollo.MutationResult<LoginMutation>;
export type LoginMutationOptions = Apollo.BaseMutationOptions<LoginMutation, LoginMutationVariables>;
export const GetAllUsersDocument = gql`
    query GetAllUsers {
  users {
    id
  }
}
    `;

/**
 * __useGetAllUsersQuery__
 *
 * To run a query within a React component, call `useGetAllUsersQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAllUsersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAllUsersQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetAllUsersQuery(baseOptions?: Apollo.QueryHookOptions<GetAllUsersQuery, GetAllUsersQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetAllUsersQuery, GetAllUsersQueryVariables>(GetAllUsersDocument, options);
      }
export function useGetAllUsersLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetAllUsersQuery, GetAllUsersQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetAllUsersQuery, GetAllUsersQueryVariables>(GetAllUsersDocument, options);
        }
export type GetAllUsersQueryHookResult = ReturnType<typeof useGetAllUsersQuery>;
export type GetAllUsersLazyQueryHookResult = ReturnType<typeof useGetAllUsersLazyQuery>;
export type GetAllUsersQueryResult = Apollo.QueryResult<GetAllUsersQuery, GetAllUsersQueryVariables>;
export const GetUserByIdDocument = gql`
    query getUserById($id: String!) {
  userById(id: $id) {
    id
    name
    bio
    email
    phone
    gender
    role
    birdDate
    createdAt
    updatedAt
  }
}
    `;

/**
 * __useGetUserByIdQuery__
 *
 * To run a query within a React component, call `useGetUserByIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetUserByIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetUserByIdQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetUserByIdQuery(baseOptions: Apollo.QueryHookOptions<GetUserByIdQuery, GetUserByIdQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetUserByIdQuery, GetUserByIdQueryVariables>(GetUserByIdDocument, options);
      }
export function useGetUserByIdLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetUserByIdQuery, GetUserByIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetUserByIdQuery, GetUserByIdQueryVariables>(GetUserByIdDocument, options);
        }
export type GetUserByIdQueryHookResult = ReturnType<typeof useGetUserByIdQuery>;
export type GetUserByIdLazyQueryHookResult = ReturnType<typeof useGetUserByIdLazyQuery>;
export type GetUserByIdQueryResult = Apollo.QueryResult<GetUserByIdQuery, GetUserByIdQueryVariables>;
export const GetUserByRoleDocument = gql`
    query getUserByRole($role: String!) {
  userByRole(role: $role) {
    id
    name
    bio
  }
}
    `;

/**
 * __useGetUserByRoleQuery__
 *
 * To run a query within a React component, call `useGetUserByRoleQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetUserByRoleQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetUserByRoleQuery({
 *   variables: {
 *      role: // value for 'role'
 *   },
 * });
 */
export function useGetUserByRoleQuery(baseOptions: Apollo.QueryHookOptions<GetUserByRoleQuery, GetUserByRoleQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetUserByRoleQuery, GetUserByRoleQueryVariables>(GetUserByRoleDocument, options);
      }
export function useGetUserByRoleLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetUserByRoleQuery, GetUserByRoleQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetUserByRoleQuery, GetUserByRoleQueryVariables>(GetUserByRoleDocument, options);
        }
export type GetUserByRoleQueryHookResult = ReturnType<typeof useGetUserByRoleQuery>;
export type GetUserByRoleLazyQueryHookResult = ReturnType<typeof useGetUserByRoleLazyQuery>;
export type GetUserByRoleQueryResult = Apollo.QueryResult<GetUserByRoleQuery, GetUserByRoleQueryVariables>;