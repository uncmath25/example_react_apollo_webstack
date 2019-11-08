import { ApolloClient } from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { HttpLink } from 'apollo-link-http';
import { ApolloProvider as ApolloProviderHooks } from "@apollo/react-hooks";
import { ApolloProvider } from 'react-apollo';
import React from 'react';
import ReactDOM from 'react-dom';

import './css/_third_party/bootstrap-4.3.1.css';
import App from './js/App';


const cache = new InMemoryCache();
const link = new HttpLink({
  uri: process.env.REACT_APP_API_URL
});
const client = new ApolloClient({
  cache,
  link
});

ReactDOM.render(
  <ApolloProvider client={client}>
    <ApolloProviderHooks client={client}>
      <App />
    </ApolloProviderHooks>
  </ApolloProvider>, document.getElementById('root')
);
