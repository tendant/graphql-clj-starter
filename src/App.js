import React, { Component } from 'react';
// import logo from './logo.svg';
import './graphiql.css';
import GraphiQL from 'graphiql';
import {ToolbarButton, handlePrettifyQuery} from 'graphiql';
import fetch from 'isomorphic-fetch';

import CustomizedBar from './CustomizedBar';

class App extends Component {
  graphQLFetcher(graphQLParams) {
    // var host = window.location.origin;
    var host = "http://localhost:3002";
    return fetch( host + '/graphql', {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'same-origin',
      body: JSON.stringify(graphQLParams)
    }).then(response => response.json());
  }
  
  render() {
    return (<div>
        <CustomizedBar />
        <GraphiQL fetcher={this.graphQLFetcher}>
          <GraphiQL.Toolbar>

        <ToolbarButton
          onClick={handlePrettifyQuery}
          title="Prettify Query (Shift-Ctrl-P)"
          label="Prettify"
        />
        <ToolbarButton
          onClick={this.handleToggleHistory}
          title="Show History"
          label="History"
/>
          </GraphiQL.Toolbar>
        </GraphiQL></div>
    );
  }
}

export default App;
