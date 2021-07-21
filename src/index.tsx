import React from 'react';
import ReactDOM from 'react-dom';
import { ApolloProvider, HttpLink, InMemoryCache, ApolloClient } from '@apollo/client';
import './index.css';
import App from './App';
import { setContext } from '@apollo/client/link/context';
import reportWebVitals from './reportWebVitals';


const httpLink = new HttpLink({ uri: process.env.REACT_APP_GITHUB_API });

const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = localStorage.getItem('searcherToken');
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      Authorization: token ? `Bearer ${token}` : "",
    }
  }
});


const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: authLink.concat(httpLink)
});

ReactDOM.render(
  <React.StrictMode>
    <ApolloProvider client={client as ApolloClient<any>}>
        <App />
    </ApolloProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
