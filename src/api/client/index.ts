import {ApolloClient} from '@apollo/client/core';
import {InMemoryCache} from '@apollo/client/core';
import {ApolloLink} from '@apollo/client/core';
import {createUploadLink} from 'apollo-upload-client';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function createApolloClient(): ApolloClient<any> {
  const httpLink = createUploadLink({
    uri: process.env.VUE_APP_GRAPHQL_URI,
  });

  const cache = new InMemoryCache();

  return new ApolloClient({
    link: ApolloLink.from([httpLink]),
    cache: cache,
  });
}
