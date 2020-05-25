import React, { Component } from 'react';
import _ from 'lodash';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

class Pagination extends Component {

  componentDidUpdate(prevState, prevProps) {
    //console.log('prevstate',prevState);
    //console.log('prevprops',prevProps);
    // we access props with this.props
    // and state with this.state
    
    // prevState contains state before update
    // prevProps contains props before update
  }

  componentDidMount() {
    //console.log('mount - pagination');
  }

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
            <Link to="" className="page-link" onClick={() => onPageChange(page)}>{page}</Link></li>)}
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