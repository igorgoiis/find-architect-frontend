import * as Types from './graphql';

import * as Operations from './graphql';
import { NextPage } from 'next';
import { NextRouter, useRouter } from 'next/router'
import { QueryHookOptions, useQuery } from '@apollo/client';
import * as Apollo from '@apollo/client';
import type React from 'react';
import { getApolloClient , ApolloClientContext} from '../../lib/withPublicApollo';
export async function getServerPageGetUsers
    (options: Omit<Apollo.QueryOptions<Types.GetUsersQueryVariables>, 'query'>, ctx: ApolloClientContext ){
        const apolloClient = getApolloClient(ctx);

        const data = await apolloClient.query<Types.GetUsersQuery>({ ...options, query: Operations.GetUsersDocument });

        const apolloState = apolloClient.cache.extract();

        return {
            props: {
                apolloState: apolloState,
                data: data?.data,
                error: data?.error ?? data?.errors ?? null,
            },
        };
      }
export const useGetUsers = (
  optionsFunc?: (router: NextRouter)=> QueryHookOptions<Types.GetUsersQuery, Types.GetUsersQueryVariables>) => {
  const router = useRouter();
  const options = optionsFunc ? optionsFunc(router) : {};
  return useQuery(Operations.GetUsersDocument, options);
};
export type PageGetUsersComp = React.FC<{data?: Types.GetUsersQuery, error?: Apollo.ApolloError}>;
export const withPageGetUsers = (optionsFunc?: (router: NextRouter)=> QueryHookOptions<Types.GetUsersQuery, Types.GetUsersQueryVariables>) => (WrappedComponent:PageGetUsersComp) : NextPage  => (props) => {
                const router = useRouter()
                const options = optionsFunc ? optionsFunc(router) : {};
                const {data, error } = useQuery(Operations.GetUsersDocument, options)
                return <WrappedComponent {...props} data={data} error={error} /> ;

            };
export const ssrGetUsers = {
      getServerPage: getServerPageGetUsers,
      withPage: withPageGetUsers,
      usePage: useGetUsers,
    }
