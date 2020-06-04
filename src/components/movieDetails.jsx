import React from 'react';
import { getMovie } from '../services/fakeMovieService';
import Form from './form';
import Joi from 'joi-browser';
import { saveMovie } from '../services/fakeMovieService';
import * as genresAPI from '../services/fakeGenreService';

class MovieDetails extends Form {

  state = {
    data: { title: '', genreId: '', numberInStock: '', dailyRentalRate: '', _id: '' },
    errors: {}
  };

  genres = genresAPI.getGenres();

  schema = {
    title: Joi.string().required().label('Title'),
    genreId: Joi.string().required().label('Genre'),
    numberInStock: Joi.number().min(0).max(100).required().label('Number In Stock'),
    dailyRentalRate: Joi.number().min(0).max(10).required().label('Daily Rental Rate'),
    _id: Joi.string().allow('')
  }

  doSubmit = () => {
    const { title, genreId, numberInStock, dailyRentalRate: rate, _id } = this.state.data;

    const movie = {
      _id: _id,
      title: title,
      genreId: genreId,
      numberInStock: numberInStock,
      dailyRentalRate: rate
    };

    const newMovie = saveMovie(movie);

    //redirect to /movies
    this.props.history.push('/movies');
  }

  componentDidMount() {

    let movieId = this.props.match.params.id;

    if (movieId && movieId !== 'new') {
      //find movie in a database
      const movieInDb = getMovie(movieId);

      if (movieInDb) {
        //fill properties
        const data = {};
        data._id = movieInDb._id;
        data.title = movieInDb.title;
        data.genreId = movieInDb.genre._id;
        data.numberInStock = movieInDb.numberInStock;
        data.dailyRentalRate = movieInDb.dailyRentalRate;
        this.setState({ data });
      }
      else {
        //redirect to not_found page
        this.props.history.replace('/not-found')
      }

    }
  }

  render() {

    const genreList = this.genres.map(x => ({ label: x.name, value: x._id }));

    return (
      <div>
        <h1>Movie Form</h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput('title', 'Title')}
          {this.renderDropdown('genreId', 'Genre', genreList, this.state.data.genreId)}
          {this.renderInput('numberInStock', 'Number In Stock')}
          {this.renderInput('dailyRentalRate', 'Daily Rental Rate')}
          {this.renderButton("Save")}
        </form>
      </div>
    );
  }

}

export default MovieDetails;