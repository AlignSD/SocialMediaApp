import React from 'react';
import App from './App';
import { ApolloClient, InMemoryCache, createHttpLink, ApolloProvider } from '@apollo/client';
import { setContext } from 'apollo-link-context';


const httpLink = createHttpLink({
  // uri: "http://localhost:5000" for dev
  uri: 'https://social-media-merng-app.herokuapp.com/'
});

const authLink = setContext(() => {
  const token = localStorage.getItem('jwtToken');
  return{
    headers: {
      Authorization: token ? `Bearer ${token}` : '' // makes sure user who posts has valid token
    }
  }
})

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache()
});



export default (
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>
)
