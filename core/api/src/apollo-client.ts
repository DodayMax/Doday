import { createHttpLink } from 'apollo-link-http';
import { setContext } from 'apollo-link-context';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloClient } from 'apollo-client';

const httpLink = createHttpLink({
  uri: 'http://localhost:4040',
});

const authLink = setContext((_, { headers }) => {
  //const token = localStorage.getItem('id_token');
  return {
    headers: {
      ...headers,
      //authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

export default client;
