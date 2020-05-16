import React, { Component } from 'react';
import LikeToggle from './like-toggle';
import ProgressBar from './progressbar';
import Table from './table';

class MoviesTable extends Component {
  state = {}
  columns = [{ path: 'title', label: 'Title' },
    { path: 'genre.name', label: 'Genre' },
    { path: 'numberInStock', label: 'Stock' },
    { path: 'dailyRentalRate', label: 'Rate' },
    {key: "like", content: movie => <LikeToggle className="clickable" isLiked={movie.isLiked} onToggle={() => this.props.onLikeClick(movie)} />},
    {key: "progress", content: movie => <ProgressBar now={movie.numberInStock} onClick={() => this.props.onProgressClick(movie)} />},
    {key: "delete", content: movie => <button onClick={() => this.props.onMovieDelete(movie)} className="btn btn-danger">Delete</button>}
  ];
  //columns: array
  //sortColumn: object
  // onSort: function

  render() {
    const {movies, onSort, sortColumn} = this.props;
    
    return (
      <Table columns={this.columns} sortColumn={sortColumn} data={movies} onSort={onSort}/>
    );
  }
}

export default MoviesTable;