import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions =  {}
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type AuthArgs = {
  accessToken: Scalars['String'];
  idToken: Scalars['String'];
  refreshToken: Scalars['String'];
};

export type AuthResponse = {
  __typename?: 'AuthResponse';
  success: Scalars['Boolean'];
};

export type Mutation = {
  __typename?: 'Mutation';
  logIn: AuthResponse;
  refreshTokens: AuthResponse;
  signOut: AuthResponse;
};


export type MutationLogInArgs = {
  input: AuthArgs;
};

export type Query = {
  __typename?: 'Query';
  getUserById: User;
  me: User;
};


export type QueryGetUserByIdArgs = {
  input: UserByIdArgs;
};

export type Subscription = {
  __typename?: 'Subscription';
  updateNearestData: UserUpdateResponse;
  updateUserOnline: UserOnlineResponse;
};


export type SubscriptionUpdateNearestDataArgs = {
  input: TrackedUsersArgs;
};

export type TrackedUsersArgs = {
  ids: Array<Scalars['String']>;
};

export type User = {
  __typename?: 'User';
  _count?: Maybe<UserCount>;
  avatar: Scalars['String'];
  id: Scalars['String'];
  is_disabled: Scalars['Boolean'];
  name: Scalars['String'];
};

export type UserByIdArgs = {
  id: Scalars['String'];
};

export type UserCount = {
  __typename?: 'UserCount';
  requests_as_customer: Scalars['Int'];
  requests_as_supplier: Scalars['Int'];
};

export type UserOnlineResponse = {
  __typename?: 'UserOnlineResponse';
  _count?: Maybe<UserCount>;
  avatar: Scalars['String'];
  distance?: Maybe<Scalars['Float']>;
  id: Scalars['String'];
  is_disabled: Scalars['Boolean'];
  name: Scalars['String'];
  online: Scalars['Boolean'];
};

export type UserUpdateResponse = {
  __typename?: 'UserUpdateResponse';
  distance?: Maybe<Scalars['Float']>;
  id: Scalars['String'];
};

export type LoginMutationVariables = Exact<{
  logInInput: AuthArgs;
}>;


export type LoginMutation = (
  { __typename?: 'Mutation' }
  & { logIn: (
    { __typename?: 'AuthResponse' }
    & Pick<AuthResponse, 'success'>
  ) }
);


export const LoginDocument = gql`
    mutation login($logInInput: AuthArgs!) {
  logIn(input: $logInInput) {
    success
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
 *      logInInput: // value for 'logInInput'
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