import React, { Component } from 'react';

class TableHeader extends Component {

  renderSortIcon = column => {
    const { sortColumn } = this.props;
    if (column.path !== sortColumn.path) return null;
    if (sortColumn.order === 'asc') return <i className="fa fa-sort-asc"></i>
    return <i className="fa fa-sort-desc"></i>
  };

  raiseSort = path => {

    console.log('onSort', path);
    const sortColumn = { ...this.props.sortColumn };

    if (sortColumn.path === path) {
      sortColumn.order = (sortColumn.order === 'asc') ? 'desc' : 'asc';
    }
    else {
      sortColumn.path = path;
      sortColumn.order = 'asc';
    }
    this.props.onSort(sortColumn);
  };

  render() {
    return (
      <thead>
        <tr>
          {this.props.columns.map(column => <th className="clickable" style={column.style} key={column.path || column.key}
            onClick={() => this.raiseSort(column.path)}>
            {column.label} {this.renderSortIcon(column)}
          </th>)}
        </tr>
      </thead>
    );
  }
}

export default TableHeader;