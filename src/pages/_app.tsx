import type { AppProps } from 'next/app';
import { ChakraProvider } from '@chakra-ui/react';
import theme from '../styles/theme';
import { AuthProvider } from '../context/AuthContext';
import { ApolloProvider } from '@apollo/client';
import { getApolloClient } from '../lib/apolloClient';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider theme={theme}>
      <ApolloProvider client={getApolloClient(pageProps.apolloState)}>
        <AuthProvider>
          <Component {...pageProps} />
        </AuthProvider>
      </ApolloProvider>
    </ChakraProvider>
  );
}
