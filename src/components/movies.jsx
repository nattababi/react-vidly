import React, { Component } from 'react';
import { getMovies } from '../services/fakeMovieService';

class Movies extends Component {
  state = {
    movies: getMovies()
  };

  handleDelete = (movie) => {

  };

  render() {
    return (
      <div>
        <h3>Showing {this.state.movies.length} movies in the database.</h3>
        <table class="table table-striped">
          <thead>
            <tr>
              <th scope="col">Title</th>
              <th scope="col">Genre</th>
              <th scope="col">Stock</th>
              <th scope="col">Rate</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {this.state.movies.map(x => (
              <tr>
                <td>{x.title}</td>
                <td>{x.genre.name}</td>
                <td>{x.numberInStock}</td>
                <td>{x.dailyRentalRate}</td>
                <td><button type="button" class="btn btn-danger">Delete</button></td>
              </tr>
              ))}
          </tbody>
        </table>     
      </div>
    );
  }
}

export default Movies;