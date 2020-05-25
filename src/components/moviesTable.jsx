import React, { Component } from 'react';
import LikeToggle from './like-toggle';
import ProgressBar from './progressbar';
import Table from './table';
import { Link } from 'react-router-dom';

class MoviesTable extends Component {

  columns = [{
    path: 'title', label: 'Title', style: { minWidth: '120px' },
    content: movie => <Link to={`/movies/${movie._id}`}>{movie.title}</Link>
  },
  { path: 'genre.name', label: 'Genre', style: { minWidth: '40px' } },
  { path: 'numberInStock', label: 'Stock', style: { minWidth: '60px' } },
  { path: 'dailyRentalRate', label: 'Rate', style: { minWidth: '40px' } },
  {
    key: "like",
    content: movie => <LikeToggle
      isLiked={movie.isLiked}
      onToggle={() => this.props.onLikeClick(movie)} />
  },
  {
    key: "progress",
    content: movie => <ProgressBar
      now={movie.numberInStock}
      onClick={() => this.props.onProgressClick(movie)} />, style: { width: '200px' }
  },
  { key: "delete", content: movie => <button onClick={() => this.props.onMovieDelete(movie)} className="btn btn-danger">Delete</button> }
  ];
  //columns: array
  //sortColumn: object
  // onSort: function

  componentDidMount() {
    //console.log('mount - moviestable');
  }

  render() {
    const { movies, onSort, sortColumn } = this.props;

    return (
      <Table columns={this.columns} sortColumn={sortColumn} data={movies} onSort={onSort} />
    );
  }
}

export default MoviesTable;