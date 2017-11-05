import React, { Component } from 'react';
// import logo from './logo.svg';
import './graphiql.css';
import GraphiQL from 'graphiql';
import {ToolbarButton, handlePrettifyQuery} from 'graphiql';
import fetch from 'isomorphic-fetch';

import CustomizedBar from './CustomizedBar';

class App extends Component {

  constructor(props) {
    super(props);
    var endpoint = "http://localhost:3002/graphql";
    this.state = {
      endpoint: endpoint,
      fetcher: this.createFetcher(endpoint)
    };
    this.onChangeEndpoint = this.onChangeEndpoint.bind(this);
  }

  onChangeEndpoint(endpoint) {
    if (endpoint && endpoint != this.state.endpoint) {
      var fetcher = this.createFetcher(endpoint);
      this.setState({
        fetcher: fetcher
      });
    }
  }

  createFetcher(endpoint) {
    return function(graphQLParams) {
      return fetch( endpoint, {
        method: 'post',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'same-origin',
        body: JSON.stringify(graphQLParams)
      }).then(response => response.json());
    };
  }

  render() {
    return (<div>
        <CustomizedBar endpoint={this.state.endpoint} onChangeEndpoint={this.onChangeEndpoint} />
        <GraphiQL fetcher={this.state.fetcher}>
        </GraphiQL></div>
    );
  }
}

export default App;
