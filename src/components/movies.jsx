import React, { Component } from 'react';
import { getMovies } from '../services/fakeMovieService';

class Movies extends Component {
  state = {
    movies: getMovies()
  };

  handleDelete = (movie) => {
    //console.log('Handle delete', movie);
    this.setState({movies: this.state.movies.filter(x => x._id !== movie._id)});
  };

  render() {
    if (this.state.movies.length === 0) return <div>There are no movies in the database</div>;

    return (
      <React.Fragment>
        <p> Showing {this.state.movies.length} movies in the database</p>
        <table className="table table-striped">
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
              <tr key={x._id}>
                <td>{x.title}</td>
                <td>{x.genre.name}</td>
                <td>{x.dailyRentalRate}</td>
                <td>{x.numberInStock}</td>
                <td><button onClick={() => this.handleDelete(x)} className="btn btn-danger">Delete</button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </React.Fragment>
    );
  }
}

export default Movies;