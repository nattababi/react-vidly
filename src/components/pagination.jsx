import React, { Component } from 'react';
import _ from 'lodash';
import PropTypes from 'prop-types';

class Pagination extends Component {

  render() {
    const { itemsCount, pageSize, currentPage, onPageChange } = this.props;
    const pagesCount = Math.ceil(itemsCount / pageSize);

    if (pagesCount === 1) {
      return null;
    }

    // [1..pagesCount].map
    const pages = _.range(1, pagesCount + 1);

    return (
      <nav aria-label="...">
        <ul className="pagination justify-content-center pagination-sm">
          {pages.map(page => <li key={page}
            className={page === currentPage ? 'page-item active' : 'page-item'}>
            <div className="page-link" onClick={() => onPageChange(page)}>{page}</div></li>)}
        </ul>
      </nav>
    );
  }
}

Pagination.propTypes = {
  itemsCount: PropTypes.number.isRequired,
  pageSize: PropTypes.number.isRequired,
  currentPage: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired
};

export default Pagination;