import React, { Component } from 'react';
import { getMovies } from '../services/fakeMovieService';
import LikeToggle from './like-toggle';
import ProgressBar from './progressbar';
import Pagination from './pagination';

class Movies extends Component {
  state = {
    movies: getMovies(),
    currentPage: 1,
    pageSize: 4
  };

  handleDelete = (movie) => {
    //console.log('Handle delete', movie);
    this.setState({ movies: this.state.movies.filter(x => x._id !== movie._id) });
  };

  handleLikeToggle = (movie) => {
    console.log('icon clicked', movie.isLiked);
    movie.isLiked = !movie.isLiked;
    //let index = this.state.movies.indexOf()
    this.setState({ movies: this.state.movies });
  };

  handleProgressbar = (movie) => {
    console.log('progressbar clicked', movie.numberInStock);
    //movie.numberInStock++;
    let movies = this.state.movies;
    let index = this.state.movies.indexOf(movie);
    this.state.movies[index].numberInStock = (movie.numberInStock > 0) ? this.state.movies[index].numberInStock - 1 : 10;
    this.setState({ movies });
  };

  handlePageChange = (page) => {
    //console.log(page);
    this.setState({ currentPage: page });
  }

  handleSave = () => {
    console.log(this.state.movies);
  };

  render() {

    const { pageSize, currentPage } = this.state;

    if (this.state.movies.length === 0) return <div>There are no movies in the database</div>;

    return (
      <React.Fragment>
        <p> Showing {this.state.movies.length} movies in the database</p>
        <button onClick={this.handleSave} className="btn btn-primary m-2">Save all</button>
        <table className="table table-striped">
          <thead>
            <tr style={{ margin: '20px' }}>
              <th scope="col" style={{ verticalAlign: 'middle', paddingLeft: '24px' }}>Title</th>
              <th scope="col" style={{ verticalAlign: 'middle' }}>Genre</th>
              <th scope="col" style={{ verticalAlign: 'middle' }}>Stock</th>
              <th scope="col" style={{ verticalAlign: 'middle' }}>Rate</th>
              <th style={{ width: '240px' }}></th>
              <th></th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {this.state.movies.map(x => (
              <tr key={x._id} style={{ verticalAlign: 'middle' }}>
                <td style={{ verticalAlign: 'middle', paddingLeft: '24px' }}>{x.title}</td>
                <td style={{ verticalAlign: 'middle' }}>{x.genre.name}</td>
                <td style={{ verticalAlign: 'middle' }}>{x.numberInStock}</td>
                <td style={{ verticalAlign: 'middle' }}>{x.dailyRentalRate}</td>
                <td style={{ verticalAlign: 'middle' }}>
                  <ProgressBar now={x.numberInStock}
                    onClick={() => this.handleProgressbar(x)} /></td>
                <td style={{ verticalAlign: 'middle' }}>
                  <LikeToggle isLiked={x.isLiked}
                    onToggle={() => this.handleLikeToggle(x)} /></td>
                <td style={{ verticalAlign: 'middle' }}><button onClick={() => this.handleDelete(x)} className="btn btn-danger">Delete</button></td>
              </tr>
            ))}
          </tbody>
        </table>
        <Pagination itemsCount={this.state.movies.length}
          pageSize={pageSize}
          currentPage={currentPage}
          onPageChange={this.handlePageChange} />
      </React.Fragment>
    );
  }
}

export default Movies;
