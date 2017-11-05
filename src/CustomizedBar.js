import React, { Component } from 'react';
import GraphiQL, {ToolbarButton} from 'graphiql';
import {ModalContainer, ModalDialog} from 'react-modal-dialog';


class EndPointModal extends Component {

  render() {
    console.log("handleClose:", this.props.handleClose);
    return (
      <ModalContainer onClose={this.props.handleClose}>
        <ModalDialog onClose={this.props.handleClose} dismissOnBackgroundClick={true} >
          <label>New endpoint:
            <input type="text" name="name" />
          </label>
          <button onClick={null}>Change</button>
        </ModalDialog>
      </ModalContainer>
    );
  }
}

export default class CustommizedBar extends Component {

  constructor(props) {
    super(props);
    this.state = {
      showEndPointModal: false
    };
    this.updateEndPoint = this.updateEndPoint.bind(this);
    this.changeEndPoint = this.changeEndPoint.bind(this);
  }

  updateEndPoint() {
    this.setState({
      showEndPointModal: false
    });
  }

  changeEndPoint() {
    this.setState({
      showEndPointModal: true
    });
  }

  render() {
    return (
        <GraphiQL.Toolbar>
          <ToolbarButton title="Change EndPoint" label="Change EndPoint" onClick={this.changeEndPoint} />
          {this.state.showEndPointModal && <EndPointModal handleClose={this.updateEndPoint} />}
        </GraphiQL.Toolbar>
    );
  }
}