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
    var endpoint = "http://localhost:3001/graphql";
    this.state = {
      endpoint: endpoint,
      fetcher: this.createFetcher(endpoint)
    };
    this.onChangeEndpoint = this.onChangeEndpoint.bind(this);
  }

  onChangeEndpoint(endpoint) {
    console.log("change endpoint in app:", endpoint);
    if (endpoint && endpoint != this.state.endpoint) {
      var fetcher = this.createFetcher(endpoint);
      this.setState({
        endpoint: endpoint,
        fetcher: fetcher
      });
    }
  }

  onChangeHeaders = (headers) => {
    if (headers && headers != this.state.headers) {
      var fetcher = this.createFetcher(this.state.endpoint, headers);
      this.setState({
        fetcher: fetcher,
        headers: headers
      });
    }
  }

  createFetcher(endpoint, headers) {
    console.log("headers:", headers);
    return function(graphQLParams) {
      var defaultHeaders = { 'Content-Type': 'application/json' };
      console.log("createFetcher headers:", headers);
      console.log("reduced headers:", headers ? headers.reduce (function (m, obj) {
        console.log("adding header", obj.name, "adding value", obj.value);
        if (obj.name && obj.value) {
          m[obj.name] = obj.value;
        }
        return m;
      }, defaultHeaders) : defaultHeaders);
      return fetch( endpoint, {
        method: 'post',
        headers: headers ? headers.reduce (function (m, obj) {
          if (obj.name && obj.value) {
            m[obj.name] = obj.value;
          }
          return m;
        }, defaultHeaders) : defaultHeaders,
        credentials: 'same-origin',
        body: JSON.stringify(graphQLParams)
      }).then(response => response.json());
    };
  }

  render() {
    return [
        <CustomizedBar endpoint={this.state.endpoint} headers={this.state.headers} onChangeEndpoint={this.onChangeEndpoint} onChangeHeaders={this.onChangeHeaders} />,
        <GraphiQL fetcher={this.state.fetcher}>,
        </GraphiQL>,
    ];
  }
}

export default App;
