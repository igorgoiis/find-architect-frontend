import { ApolloClient } from "@apollo/client";
import { createHttpLink, from, InMemoryCache } from "@apollo/client/core";

const httpLink = createHttpLink({
  uri: 'http://localhost:3333/graphql',
  fetch
});

const cache = new InMemoryCache();

export const apolloClient = new ApolloClient({
  link: from([httpLink]),
  cache
})