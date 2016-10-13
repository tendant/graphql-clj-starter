import React, { Component } from 'react';
// import logo from './logo.svg';
import './graphiql.css';
import GraphiQL from 'graphiql';
import fetch from 'isomorphic-fetch';

class App extends Component {
  graphQLFetcher(graphQLParams) {
    var host = window.location.origin;
    // var host = "http://localhost:3002";
    return fetch( host + '/graphql', {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'same-origin',
      body: JSON.stringify(graphQLParams)
    }).then(response => response.json());
  }
  
  render() {
    return (
        <GraphiQL fetcher={this.graphQLFetcher} />
    );
  }
}

export default App;
