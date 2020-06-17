import React from 'react';
import { getMovie, saveMovie } from '../services/movieService';
import * as genresAPI from '../services/genreService';
import { ToastContainer } from 'react-toastify';
import Form from './form';
import Joi from 'joi-browser';

class MovieDetails extends Form {

  state = {
    data: { title: '', genreId: '', numberInStock: '', dailyRentalRate: '', _id: '' },
    errors: {}
  };

  genres = [];

  schema = {
    title: Joi.string().min(5).required().label('Title'),
    genreId: Joi.string().required().label('Genre'),
    numberInStock: Joi.number().min(0).max(100).required().label('Number In Stock'),
    dailyRentalRate: Joi.number().min(0).max(10).required().label('Daily Rental Rate'),
    _id: Joi.string().allow('')
  }

  doSubmit = async() => {
    const { title, genreId, numberInStock, dailyRentalRate: rate, _id } = this.state.data;

    const movie = {
      _id: _id,
      title: title,
      genreId: genreId,
      numberInStock: numberInStock,
      dailyRentalRate: rate
    };

    try{
      const newMovie = await saveMovie(movie);
    }
    catch (ex){
      if (ex.response && ex.response.status === 404) {
        alert('This post has already been deleted');
      }
      console.error('ERROR!!!', ex);
    }
    //redirect to /movies
    this.props.history.push('/movies');
  }

  async componentDidMount() {

    this.genres = await genresAPI.getGenres();
    let movieId = this.props.match.params.id;

    if (movieId && movieId !== 'new') {
      //find movie in a database
      console.log('trying...')
      let movieInDb = {};
      let operationSuccess = true;
      try{
        movieInDb = await getMovie(movieId);
      }
      catch(ex){
        if (ex.response && ex.response.status === 404){
          operationSuccess = false;
        }
      }
      
      if (!operationSuccess) {
        //redirect to not-found
        this.props.history.replace('/not-found');
      }
      else{
        //fill properties
        const data = {};
        data._id = movieInDb._id;
        data.title = movieInDb.title;
        data.genreId = movieInDb.genre._id;
        data.numberInStock = movieInDb.numberInStock;
        data.dailyRentalRate = movieInDb.dailyRentalRate;
        this.setState({ data });
      }
    }
  }

  render() {

    const genreList = this.genres.map(x => ({ label: x.name, value: x._id }));

    return (
      <div>
        <h1>Movie Form</h1>
        <ToastContainer />
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