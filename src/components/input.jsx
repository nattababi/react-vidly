import React, { Component } from 'react';

class Input extends Component {
  state = {}
  render() {
    return (
      <div className="form-group">
        <label htmlFor={this.props.name}>{this.props.label}}</label>
        <input
          value={this.props.value}
          autoFocus ref={this.username}
          onChange={this.props.onChange}
          name={this.props.name}
          id={this.props.name}
          type="text"
          className="form-control" />
      </div>
    );
  }
}

export default Input;