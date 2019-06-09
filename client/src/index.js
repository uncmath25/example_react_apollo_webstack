import { ApolloClient } from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { HttpLink } from 'apollo-link-http';
import gql from "graphql-tag";
import { ApolloProvider } from 'react-apollo';
import React from 'react';
import ReactDOM from 'react-dom';

import './css/_third_party/bootstrap-4.3.1.css'
import App from './js/App';


const cache = new InMemoryCache();
const link = new HttpLink({
  uri: process.env.REACT_APP_API_URL
})

const client = new ApolloClient({
  cache,
  link
})

client
  .query({
    query: gql`
      query GetExpenses {
        expenses(startDate: "2017-10-01", endDate: "2017-11-01") {
          id
          category
          date
          title
          description
          cost
        }
      }
    `
  })
  .then(result => console.log(result));

console.log(process.env.REACT_APP_API_URL);

ReactDOM.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>, document.getElementById('root')
);
