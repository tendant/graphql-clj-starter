import React, { Component } from 'react';
import GraphiQL, {ToolbarButton} from 'graphiql';
import { Portal } from 'react-portal';
import HeaderForm from './HeaderForm';


class EndpointModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      endpoint: this.props.endpoint
    };
    this.handleEndpointIntput = this.handleEndpointIntput.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleEndpointIntput(event) {
    this.setState({
      endpoint: event.target.value
    });
  }

  handleChange() {
    this.props.onChange(this.state.endpoint);
  }

  render() {
    console.log("endpoint modal:", this.state.endpoint);
    return (
          <div>
            <label>New endpoint:
              <input type="text" name="name" value={this.state.endpoint} onChange={this.handleEndpointIntput} />
            </label>
            <button onClick={this.handleChange}>Change</button>
          </div>
    );
  }
}

export default class CustommizedBar extends Component {

  constructor(props) {
    super(props);
    this.state = {
      showEndpointModal: false,
      showHeaders: false
    };
    this.updateEndpoint = this.updateEndpoint.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }

  handleClose() {
    this.setState({
      showEndpointModal: false,
      showHeaders: false
    });
  }

  updateEndpoint(endpoint) {
    this.props.onChangeEndpoint(endpoint);
    this.handleClose();
  }

  showEndpoint = () => {
    console.log("showEndpoint");
    this.setState({
      showEndpointModal: true,
      showHeaders: false
    });
    console.log(this.state);
  }

  showHeaders = () => {
    console.log("showHeaders");
    this.setState({
      showHeaders: true,
      showEndpointModal: false
    });
  }

  onChangeHeaders = (headers) => {
    this.props.onChangeHeaders(headers);
    this.handleClose();
  }

  render() {
    return (
        <GraphiQL.Toolbar>
          <ToolbarButton key="endpoint" title="Change Endpoint" label="Change Endpoint" onClick={this.showEndpoint} />
          <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
          <ToolbarButton key="header" title="Change Header" label="Change Headers" onClick={this.showHeaders} />
          {this.state.showEndpointModal && <EndpointModal endpoint={this.props.endpoint} handleClose={this.handleClose} onChange={this.updateEndpoint} />}
          {this.state.showHeaders && <HeaderForm headers={this.props.headers} onChangeHeaders={this.onChangeHeaders} />}
        </GraphiQL.Toolbar>
    );
  }
}
