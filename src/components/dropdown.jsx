import React, { Component } from 'react';

class Dropdown extends Component {
  state = {}
  render() {
    const { name, label, error, data, value, ...rest } = this.props;

    return (<div className="form-group">
      <label htmlFor="sel1">{label}</label>
      <select 
        {...rest}
        className="form-control"
        id={name}
        name={name}>
        <option disabled selected> -- select an option -- </option>
        {data.map(x => <option selected={ value === x ? "selected" : ""} key={x}>{x}</option>)}
      </select>
    </div>);
  }
}

export default Dropdown;