import React, { Component } from 'react';
import NewMovieForm from './newMovieForm';
import { getMovie, getMovies } from '../services/fakeMovieService';
import NotFound from './notFound';

class MovieDetails extends Component {
  state = {}

  handleSave = () => {
    // Navigate to /products
    //this.props.history.replace('/movies'); // no history
    this.props.history.push('/movies'); // with history

  };

  render() {

    //find movie with the given Id
    const id = this.props.match.params.id;
    const movieInDb = getMovie(id);

    console.log(movieInDb);

    if (movieInDb) {
      //console.log('movie is found');
      return (
        <NewMovieForm
          _id={movieInDb._id}
          title={movieInDb.title}
          genre={movieInDb.genre}
          numberInStock={movieInDb.numberInStock}
          dailyRentalRate={movieInDb.dailyRentalRate}
          history={this.props.history}
        />
      );
    }
    else {

      // const movies = getMovies();
      // console.log(movies);
      
      //redirect to not_found page
      //this.props.history.push('/not-found'); // with history
      
      return(
        <NotFound/>
      );

    }


  }
}

export default MovieDetails;