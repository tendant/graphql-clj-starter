import React, { Component } from 'react';

export default class HeaderForm extends React.Component {
  constructor(props) {
    super(props);
    console.log("constructor: props", this.props);
    console.log("constructor: headers", this.props.headers);
    this.state = {
      name: '',
      headers: this.props.headers? this.props.headers : [{ name: 'x-http-header-session', value: 'test-session-key' }],
    };
  }

  // ...

  handleHeaderNameChange = (idx) => (evt) => {
    const newHeaders = this.state.headers.map((header, sidx) => {
      if (idx !== sidx) return header;
      return { ...header, name: evt.target.value };
    });

    this.setState({ headers: newHeaders });
  }

  handleHeaderValueChange = (idx) => (evt) => {
    const newHeaders = this.state.headers.map((header, sidx) => {
      if (idx !== sidx) return header;
      return { ...header, value: evt.target.value };
    });

    this.setState({ headers: newHeaders });
  }

  handleSubmit = (evt) => {
    const { name, headers } = this.state;
    this.props.onChangeHeaders(headers);
  }

  handleAddHeader = () => {
    this.setState({
      headers: this.state.headers.concat([{ name: '', value: '' }])
    });
  }

  handleRemoveHeader = (idx) => () => {
    this.setState({
      headers: this.state.headers.filter((s, sidx) => idx !== sidx)
    });
  }

  render() {
    return (
      <form>
        {/* ... */}
        <h4>Headers</h4>

        {this.state.headers.map((header, idx) => (
          <div className="header" key={'header_' +idx}>
            <input
              key={'header_' + idx + '_name'}
              type="text"
              placeholder={`Header #${idx + 1} name`}
              value={header.name}
              onChange={this.handleHeaderNameChange(idx)}
            />
            <input
              key={'header_' + idx + '_value'}
              type="text"
              placeholder={`Header #${idx + 1} value`}
              value={header.value}
              onChange={this.handleHeaderValueChange(idx)}
            />
            <button key="{'button_' + idx}" type="button" onClick={this.handleRemoveHeader(idx)} className="small">-</button>
          </div>
        ))}
        <button type="button" onClick={this.handleAddHeader} className="small">Add Header</button>
        <button type="button" onClick={this.handleSubmit} >Update</button>
      </form>
    )
  }
}