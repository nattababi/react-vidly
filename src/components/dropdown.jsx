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
        name={name}
        value={ value !== "" ? value : "-- select an option --"}>
        <option disabled={true}>-- select an option --</option>
        {data.map(x => <option key={x}>{x}</option>)}
      </select>
    </div>);
  }
}

export default Dropdown;
