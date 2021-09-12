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

export type AcceptRequestArgs = {
  requestId: Scalars['String'];
};

export type AuthArgs = {
  accessToken: Scalars['String'];
  idToken: Scalars['String'];
  refreshToken: Scalars['String'];
};

export type CreateRequestResult = {
  __typename?: 'CreateRequestResult';
  requestId: Scalars['String'];
};

export type HelpMeAction = {
  __typename?: 'HelpMeAction';
  description: Scalars['String'];
  id: Scalars['String'];
  inplace: Scalars['Boolean'];
};

export type HelpMeActionArgs = {
  description: Scalars['String'];
  inplace: Scalars['Boolean'];
};

export type Mutation = {
  __typename?: 'Mutation';
  acceptRequest: SuccessResponse;
  approveRequest: SuccessResponse;
  createRequest: CreateRequestResult;
  declineRequest: SuccessResponse;
  login: SuccessResponse;
  logout: SuccessResponse;
  refreshTokens: SuccessResponse;
  updatePosition: SuccessResponse;
};


export type MutationAcceptRequestArgs = {
  input: AcceptRequestArgs;
};


export type MutationApproveRequestArgs = {
  input: AcceptRequestArgs;
};


export type MutationCreateRequestArgs = {
  input: HelpMeActionArgs;
};


export type MutationDeclineRequestArgs = {
  input: AcceptRequestArgs;
};


export type MutationLoginArgs = {
  input: AuthArgs;
};


export type MutationUpdatePositionArgs = {
  input: PositionArgs;
};

export type PositionArgs = {
  latitude: Scalars['Float'];
  longitude: Scalars['Float'];
};

export type PositionObject = {
  __typename?: 'PositionObject';
  latitude: Scalars['Float'];
  longitude: Scalars['Float'];
};

export type Query = {
  __typename?: 'Query';
  getUserById: User;
  me: User;
};


export type QueryGetUserByIdArgs = {
  input: UserByIdArgs;
};

export type RequestNearby = {
  __typename?: 'RequestNearby';
  location: PositionObject;
  request: HelpMeAction;
  requestor: User;
};

export type Subscription = {
  __typename?: 'Subscription';
  incomingRequest: RequestNearby;
};

export type SuccessResponse = {
  __typename?: 'SuccessResponse';
  success: Scalars['Boolean'];
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

export type AcceptRequestMutationVariables = Exact<{
  acceptRequestInput: AcceptRequestArgs;
}>;


export type AcceptRequestMutation = { __typename?: 'Mutation', acceptRequest: { __typename?: 'SuccessResponse', success: boolean } };

export type ApproveRequestMutationVariables = Exact<{
  approveRequestInput: AcceptRequestArgs;
}>;


export type ApproveRequestMutation = { __typename?: 'Mutation', approveRequest: { __typename?: 'SuccessResponse', success: boolean } };

export type CreateRequestMutationVariables = Exact<{
  createRequestInput: HelpMeActionArgs;
}>;


export type CreateRequestMutation = { __typename?: 'Mutation', createRequest: { __typename?: 'CreateRequestResult', requestId: string } };

export type DeclineRequestMutationVariables = Exact<{
  declineRequestInput: AcceptRequestArgs;
}>;


export type DeclineRequestMutation = { __typename?: 'Mutation', declineRequest: { __typename?: 'SuccessResponse', success: boolean } };

export type IncomingRequestSubscriptionVariables = Exact<{ [key: string]: never; }>;


export type IncomingRequestSubscription = { __typename?: 'Subscription', incomingRequest: { __typename?: 'RequestNearby', request: { __typename?: 'HelpMeAction', id: string, description: string, inplace: boolean }, requestor: { __typename?: 'User', id: string, name: string, avatar: string, is_disabled: boolean }, location: { __typename?: 'PositionObject', latitude: number, longitude: number } } };

export type LoginMutationVariables = Exact<{
  loginInput: AuthArgs;
}>;


export type LoginMutation = { __typename?: 'Mutation', login: { __typename?: 'SuccessResponse', success: boolean } };

export type LogoutMutationVariables = Exact<{ [key: string]: never; }>;


export type LogoutMutation = { __typename?: 'Mutation', logout: { __typename?: 'SuccessResponse', success: boolean } };

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = { __typename?: 'Query', me: { __typename?: 'User', id: string, name: string, avatar: string, is_disabled: boolean } };

export type UpdatePositionMutationVariables = Exact<{
  updatePositionInput: PositionArgs;
}>;


export type UpdatePositionMutation = { __typename?: 'Mutation', updatePosition: { __typename?: 'SuccessResponse', success: boolean } };


export const AcceptRequestDocument = gql`
    mutation AcceptRequest($acceptRequestInput: AcceptRequestArgs!) {
  acceptRequest(input: $acceptRequestInput) {
    success
  }
}
    `;
export type AcceptRequestMutationFn = Apollo.MutationFunction<AcceptRequestMutation, AcceptRequestMutationVariables>;

/**
 * __useAcceptRequestMutation__
 *
 * To run a mutation, you first call `useAcceptRequestMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAcceptRequestMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [acceptRequestMutation, { data, loading, error }] = useAcceptRequestMutation({
 *   variables: {
 *      acceptRequestInput: // value for 'acceptRequestInput'
 *   },
 * });
 */
export function useAcceptRequestMutation(baseOptions?: Apollo.MutationHookOptions<AcceptRequestMutation, AcceptRequestMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<AcceptRequestMutation, AcceptRequestMutationVariables>(AcceptRequestDocument, options);
      }
export type AcceptRequestMutationHookResult = ReturnType<typeof useAcceptRequestMutation>;
export type AcceptRequestMutationResult = Apollo.MutationResult<AcceptRequestMutation>;
export type AcceptRequestMutationOptions = Apollo.BaseMutationOptions<AcceptRequestMutation, AcceptRequestMutationVariables>;
export const ApproveRequestDocument = gql`
    mutation approveRequest($approveRequestInput: AcceptRequestArgs!) {
  approveRequest(input: $approveRequestInput) {
    success
  }
}
    `;
export type ApproveRequestMutationFn = Apollo.MutationFunction<ApproveRequestMutation, ApproveRequestMutationVariables>;

/**
 * __useApproveRequestMutation__
 *
 * To run a mutation, you first call `useApproveRequestMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useApproveRequestMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [approveRequestMutation, { data, loading, error }] = useApproveRequestMutation({
 *   variables: {
 *      approveRequestInput: // value for 'approveRequestInput'
 *   },
 * });
 */
export function useApproveRequestMutation(baseOptions?: Apollo.MutationHookOptions<ApproveRequestMutation, ApproveRequestMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ApproveRequestMutation, ApproveRequestMutationVariables>(ApproveRequestDocument, options);
      }
export type ApproveRequestMutationHookResult = ReturnType<typeof useApproveRequestMutation>;
export type ApproveRequestMutationResult = Apollo.MutationResult<ApproveRequestMutation>;
export type ApproveRequestMutationOptions = Apollo.BaseMutationOptions<ApproveRequestMutation, ApproveRequestMutationVariables>;
export const CreateRequestDocument = gql`
    mutation createRequest($createRequestInput: HelpMeActionArgs!) {
  createRequest(input: $createRequestInput) {
    requestId
  }
}
    `;
export type CreateRequestMutationFn = Apollo.MutationFunction<CreateRequestMutation, CreateRequestMutationVariables>;

/**
 * __useCreateRequestMutation__
 *
 * To run a mutation, you first call `useCreateRequestMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateRequestMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createRequestMutation, { data, loading, error }] = useCreateRequestMutation({
 *   variables: {
 *      createRequestInput: // value for 'createRequestInput'
 *   },
 * });
 */
export function useCreateRequestMutation(baseOptions?: Apollo.MutationHookOptions<CreateRequestMutation, CreateRequestMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateRequestMutation, CreateRequestMutationVariables>(CreateRequestDocument, options);
      }
export type CreateRequestMutationHookResult = ReturnType<typeof useCreateRequestMutation>;
export type CreateRequestMutationResult = Apollo.MutationResult<CreateRequestMutation>;
export type CreateRequestMutationOptions = Apollo.BaseMutationOptions<CreateRequestMutation, CreateRequestMutationVariables>;
export const DeclineRequestDocument = gql`
    mutation declineRequest($declineRequestInput: AcceptRequestArgs!) {
  declineRequest(input: $declineRequestInput) {
    success
  }
}
    `;
export type DeclineRequestMutationFn = Apollo.MutationFunction<DeclineRequestMutation, DeclineRequestMutationVariables>;

/**
 * __useDeclineRequestMutation__
 *
 * To run a mutation, you first call `useDeclineRequestMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeclineRequestMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [declineRequestMutation, { data, loading, error }] = useDeclineRequestMutation({
 *   variables: {
 *      declineRequestInput: // value for 'declineRequestInput'
 *   },
 * });
 */
export function useDeclineRequestMutation(baseOptions?: Apollo.MutationHookOptions<DeclineRequestMutation, DeclineRequestMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeclineRequestMutation, DeclineRequestMutationVariables>(DeclineRequestDocument, options);
      }
export type DeclineRequestMutationHookResult = ReturnType<typeof useDeclineRequestMutation>;
export type DeclineRequestMutationResult = Apollo.MutationResult<DeclineRequestMutation>;
export type DeclineRequestMutationOptions = Apollo.BaseMutationOptions<DeclineRequestMutation, DeclineRequestMutationVariables>;
export const IncomingRequestDocument = gql`
    subscription incomingRequest {
  incomingRequest {
    request {
      id
      description
      inplace
    }
    requestor {
      id
      name
      avatar
      is_disabled
    }
    location {
      latitude
      longitude
    }
  }
}
    `;

/**
 * __useIncomingRequestSubscription__
 *
 * To run a query within a React component, call `useIncomingRequestSubscription` and pass it any options that fit your needs.
 * When your component renders, `useIncomingRequestSubscription` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useIncomingRequestSubscription({
 *   variables: {
 *   },
 * });
 */
export function useIncomingRequestSubscription(baseOptions?: Apollo.SubscriptionHookOptions<IncomingRequestSubscription, IncomingRequestSubscriptionVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useSubscription<IncomingRequestSubscription, IncomingRequestSubscriptionVariables>(IncomingRequestDocument, options);
      }
export type IncomingRequestSubscriptionHookResult = ReturnType<typeof useIncomingRequestSubscription>;
export type IncomingRequestSubscriptionResult = Apollo.SubscriptionResult<IncomingRequestSubscription>;
export const LoginDocument = gql`
    mutation login($loginInput: AuthArgs!) {
  login(input: $loginInput) {
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
 *      loginInput: // value for 'loginInput'
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
export const LogoutDocument = gql`
    mutation logout {
  logout {
    success
  }
}
    `;
export type LogoutMutationFn = Apollo.MutationFunction<LogoutMutation, LogoutMutationVariables>;

/**
 * __useLogoutMutation__
 *
 * To run a mutation, you first call `useLogoutMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLogoutMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [logoutMutation, { data, loading, error }] = useLogoutMutation({
 *   variables: {
 *   },
 * });
 */
export function useLogoutMutation(baseOptions?: Apollo.MutationHookOptions<LogoutMutation, LogoutMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LogoutMutation, LogoutMutationVariables>(LogoutDocument, options);
      }
export type LogoutMutationHookResult = ReturnType<typeof useLogoutMutation>;
export type LogoutMutationResult = Apollo.MutationResult<LogoutMutation>;
export type LogoutMutationOptions = Apollo.BaseMutationOptions<LogoutMutation, LogoutMutationVariables>;
export const MeDocument = gql`
    query me {
  me {
    id
    name
    avatar
    is_disabled
  }
}
    `;

/**
 * __useMeQuery__
 *
 * To run a query within a React component, call `useMeQuery` and pass it any options that fit your needs.
 * When your component renders, `useMeQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMeQuery({
 *   variables: {
 *   },
 * });
 */
export function useMeQuery(baseOptions?: Apollo.QueryHookOptions<MeQuery, MeQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<MeQuery, MeQueryVariables>(MeDocument, options);
      }
export function useMeLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<MeQuery, MeQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<MeQuery, MeQueryVariables>(MeDocument, options);
        }
export type MeQueryHookResult = ReturnType<typeof useMeQuery>;
export type MeLazyQueryHookResult = ReturnType<typeof useMeLazyQuery>;
export type MeQueryResult = Apollo.QueryResult<MeQuery, MeQueryVariables>;
export const UpdatePositionDocument = gql`
    mutation updatePosition($updatePositionInput: PositionArgs!) {
  updatePosition(input: $updatePositionInput) {
    success
  }
}
    `;
export type UpdatePositionMutationFn = Apollo.MutationFunction<UpdatePositionMutation, UpdatePositionMutationVariables>;

/**
 * __useUpdatePositionMutation__
 *
 * To run a mutation, you first call `useUpdatePositionMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdatePositionMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updatePositionMutation, { data, loading, error }] = useUpdatePositionMutation({
 *   variables: {
 *      updatePositionInput: // value for 'updatePositionInput'
 *   },
 * });
 */
export function useUpdatePositionMutation(baseOptions?: Apollo.MutationHookOptions<UpdatePositionMutation, UpdatePositionMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdatePositionMutation, UpdatePositionMutationVariables>(UpdatePositionDocument, options);
      }
export type UpdatePositionMutationHookResult = ReturnType<typeof useUpdatePositionMutation>;
export type UpdatePositionMutationResult = Apollo.MutationResult<UpdatePositionMutation>;
export type UpdatePositionMutationOptions = Apollo.BaseMutationOptions<UpdatePositionMutation, UpdatePositionMutationVariables>;