import React, { Component } from 'react';

class SearchBox extends Component {
  state = {  }
  render() { 
    const { onChange } = this.props;
    return (
      <input
        className="form-control m-2"
        type="text"
        placeholder="Search"
        aria-label="Search"
        onChange={onChange}/>
     );
  }
}
 
export default SearchBox;