import React, { Component } from 'react';
// import NewMovieForm from './newMovieForm';
 import { getMovie, getMovies } from '../services/fakeMovieService';
// import NotFound from './notFound';

import Form from './form';
import Joi from 'joi-browser';
import { saveMovie } from '../services/fakeMovieService';
import * as genresAPI from '../services/fakeGenreService';

class MovieDetails extends Form {
  // state = {}

  // handleSave = () => {
  //   // Navigate to /products
  //   //this.props.history.replace('/movies'); // no history
  //   this.props.history.push('/movies'); // with history

  // };

  // render() {

  //   //find movie with the given Id
  //   const id = this.props.match.params.id;
  //   const movieInDb = getMovie(id);

  //   console.log(movieInDb);

  //   if (movieInDb) {
  //     //console.log('movie is found');
  //     return (
  //       <NewMovieForm
  //         _id={movieInDb._id}
  //         title={movieInDb.title}
  //         genre={movieInDb.genre}
  //         numberInStock={movieInDb.numberInStock}
  //         dailyRentalRate={movieInDb.dailyRentalRate}
  //         history={this.props.history}
  //       />
  //     );
  //   }
  //   else {

  //     // const movies = getMovies();
  //     // console.log(movies);
      
  //     //redirect to not_found page
  //     //this.props.history.push('/not-found'); // with history
      
  //     return(
  //       <NotFound/>
  //     );

  //   }


  // }

  state = {
    data: { title: '', genre: '', numberInStock: '', dailyRentalRate: '', _id: '' },
    errors: {}
  };

  genres = genresAPI.getGenres();

  schema = {
    title: Joi.string().required().label('Title'),
    genre: Joi.string().required().label('Genre'),
    numberInStock: Joi.number().min(0).max(100).required().label('Number In Stock'),
    dailyRentalRate: Joi.number().min(0).max(10).required().label('Daily Rental Rate'),
    _id: Joi.string().allow('')
  }

   doSubmit = () => {
     const { title, genre, numberInStock, dailyRentalRate: rate, _id } = this.state.data;

     //find id for genre
     const genreObj = genresAPI.genres.find(g => g.name === genre);

     const movie = {
       _id: _id,
       title: title,
       genreId: genreObj._id,
       numberInStock: numberInStock,
       dailyRentalRate: rate
     };

     const newMovie = saveMovie(movie);

     //redirect to /movies
     this.props.history.push('/movies');
   }

  componentDidMount(){

    let movieId = this.props.match.params.id;

    if (movieId){
      //find movie in a database
      const movieInDb = getMovie(movieId);

      if (movieInDb){
        //fill properties
        const data = {};
        data._id = movieInDb._id;
        data.title = movieInDb.title;
        data.genre = movieInDb.genre.name;
        data.numberInStock = movieInDb.numberInStock;
        data.dailyRentalRate = movieInDb.dailyRentalRate;
        this.setState({ data });
      }
      else{
          //redirect to not_found page
          this.props.history.replace('/not-found')
      }

    }
    console.log(this.props.match.params.id);
  }

  render() {

    const arrNames = this.genres.map(x => x.name);

    let dropdownValue = this.state.data.genre;

    return (
      <div>
        <h1>Movie Form</h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput('title', 'Title')}
          {this.renderDropdown('genre', 'Genre', arrNames, dropdownValue)}
          {this.renderInput('numberInStock', 'Number In Stock')}
          {this.renderInput('dailyRentalRate', 'Daily Rental Rate')}
          {this.renderButton("Save")}
        </form>
      </div>
    );
  }

}

export default MovieDetails;