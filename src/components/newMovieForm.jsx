import React, { Component } from 'react';
import Form from './form';
import Joi from 'joi-browser';
import { saveMovie } from '../services/fakeMovieService';
import * as genresAPI from '../services/fakeGenreService';

class NewMovieForm extends Form {
  state = {
    data: { title: '', genre: '', numberInStock: '', rate: '', _id: '' },
    errors: {}
  };

  genres = genresAPI.getGenres();

  schema = {
    title: Joi.string().required().label('Title'),
    genre: Joi.string().required().label('Genre'),
    numberInStock: Joi.number().min(0).max(100).required().label('Number In Stock'),
    rate: Joi.number().min(0).max(10).required().label('Daily Rental Rate'),
    _id: Joi.string().allow('')
  }

  constructor(props) {
    super(props);
 
    if (this.props.title) {

      //console.log('>>>>>>>MOVIE UPDATE', this.props.title);
      
      //update properties and status      
      this.state.data._id = this.props._id;
      this.state.data.title = this.props.title;
      this.state.data.genre = this.props.genre.name;
      this.state.data.numberInStock = this.props.numberInStock;
      this.state.data.rate = this.props.dailyRentalRate;
      
    }
    else{
      //console.log('>>>>>>>>>>>NEW MOVIE');
    }
  }

  doSubmit = () => {
    console.log('Ready to save');
    const { title, genre, numberInStock, rate, _id } = this.state.data;

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

  render() {

    const arrNames = this.genres.map(x => x.name);

    let dropdownValue = '';

    //on movie update
    if (this.props.genre) {
      dropdownValue = this.props.genre.name;
    }

    return (
      <div>
        <h1>Movie Form</h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput('title', 'Title')}
          {this.renderDropdown('genre', 'Genre', arrNames, dropdownValue)}
          {this.renderInput('numberInStock', 'Number In Stock')}
          {this.renderInput('rate', 'Daily Rental Rate')}
          {this.renderButton("Save")}
        </form>
      </div>
    );
  }
}

export default NewMovieForm;