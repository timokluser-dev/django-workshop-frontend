import {ApolloClient} from 'apollo-client';
import {createHttpLink} from 'apollo-link-http';
import {InMemoryCache} from 'apollo-cache-inmemory';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function createApolloClient(): ApolloClient<any> {
  const httpLink = createHttpLink({
    uri: process.env.VUE_APP_GRAPHQL_URI,
  });

  const cache = new InMemoryCache();

  return new ApolloClient({
    link: httpLink,
    cache: cache,
  });
}
