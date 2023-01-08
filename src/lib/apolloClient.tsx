import {
  ApolloClient,
  createHttpLink,
  from,
  InMemoryCache,
  NormalizedCacheObject,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { GetServerSidePropsContext } from 'next';

export type ApolloClientContext = GetServerSidePropsContext;

export function getApolloClient(ssrCache?: NormalizedCacheObject) {
  const httpLink = createHttpLink({
    uri: 'http://localhost:3333/graphql',
    fetch,
  });

  const authLink = setContext((_, { headers }) => {
    const token = localStorage.getItem('AUTH_TOKEN');
    return {
      headers: {
        ...headers,
        authorization: token ? `Bearer ${token}` : '',
      },
    };
  });

  const cache = new InMemoryCache().restore(ssrCache ?? {});

  return new ApolloClient({
    link: from([authLink.concat(httpLink)]),
    cache,
  });
}
