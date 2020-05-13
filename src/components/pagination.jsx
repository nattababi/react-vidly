import React, { Component } from 'react';
import _ from 'lodash';

class Pagination extends Component {

  
  render() {
    const { itemsCount, pageSize, currentPage } = this.props;
    console.log(currentPage);
    
    //[1,2,3].map

    const pagesCount = Math.ceil(itemsCount / pageSize);
    
    if (pagesCount === 1) return null;
    
    // [1..pagesCount].map
    const pages = _.range(1, pagesCount + 1);

    return (
      <nav aria-label="...">
        <ul className="pagination justify-content-center pagination-sm">
          {pages.map(page => <li key={page} className={page === currentPage ? 'page-item active' : 'page-item'}>
            <a className="page-link" onClick={() => this.props.onPageChange(page)}>{page}</a></li>)}
        </ul>
      </nav>
    );
  }
}

export default Pagination;