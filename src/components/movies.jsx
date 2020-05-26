import React, { Component } from 'react';
import { getMovies } from '../services/fakeMovieService';
import { getGenresExtended } from '../services/fakeGenreService';
import Pagination from './pagination';
import { prepareAndPaginate } from '../utils/paginate'
import { paginate } from '../utils/paginate'
import ListGroup from './listgroup';
import MoviesTable from './moviesTable';
import _ from 'lodash';
import queryString from 'query-string';

class Movies extends Component {

  unlisten = null;

  state = {
    movies: getMovies(),
    genres: getGenresExtended(),
    currentPage: 1,
    pageSize: 4,
    currentGenre: "All Genres",
    sortColumn: { path: "title", order: 'asc' }
  };

  webHistoryListener = (location, action) => {
    
    this.customUpdateStatus(location);

  }

  componentWillUnmount() {
    //console.log('>>> COMPONENT WILL UNMOUNT');
    this.unlisten();
  }

  componentDidMount() {

    //console.log('componentDidMount - MOVIES');

    //bind event
    this.unlisten = this.props.history.listen(this.webHistoryListener);

    this.customUpdateStatus(this.props.location);
  }

  customUpdateStatus = (location) => {

    const parsed = queryString.parse(location.search);

    const newState = {};

    if (parsed.page) {
      newState.currentPage = Number(parsed.page);
    }
    else {
      newState.currentPage = 1;
    };

    if (parsed.filter) {
      newState.currentGenre = parsed.filter;
    }
    else {
      newState.currentGenre = 'All Genres';
    }

    if (parsed.path && parsed.order) {
      newState.sortColumn = { path: parsed.path, order: parsed.order };
    }

    this.setState(newState);
  }

  handleDelete = (movie) => {

    const { currentGenre, currentPage, pageSize } = this.state;

    const allMovies = this.state.movies.filter(x => x._id !== movie._id);

    const moviesPaginated = prepareAndPaginate(allMovies, currentGenre, currentPage, pageSize);

    if (moviesPaginated.length === 0 && this.state.currentGenre !== 'All Genres') {
      console.log('-----delete normal------------');
      this.setState({ movies: allMovies });
    }
    else {
      if (this.state.currentPage > Math.ceil(allMovies.length / this.state.pageSize)) {
        console.log('-----change page------------');
        //console.log(this.state.currentPage, Math.ceil(moviesPaginated.length / this.state.pageSize))
        this.setState({ movies: allMovies, currentPage: 1 });
      }
      else {
        console.log('-----delete normal------------');
        this.setState({ movies: allMovies });
      }
    }
  };

  handleLikeToggle = (movie) => {
    movie.isLiked = !movie.isLiked;
    this.setState({ movies: this.state.movies });
  };

  handleProgressbar = (movie) => {
    let movies = this.state.movies;
    let index = this.state.movies.indexOf(movie);
    this.state.movies[index].numberInStock = (movie.numberInStock > 0) ? this.state.movies[index].numberInStock - 1 : 10;
    this.setState({ movies });
  };

  handlePageChange = (page) => {

    //preserve current query
    let parsed = queryString.parse(this.props.location.search);

    parsed.page = page;

    const url = `?${queryString.stringify(parsed)}`;
    console.log('history.push', url);
    this.props.history.push(url); // with history
  }

  handleListgroup = (name) => {

    let parsed = queryString.parse(this.props.location.search);

    //preserve changes
    if (name !== 'All Genres') {
      parsed.filter = name;
    }
    else {
      delete parsed.filter;
    }

    // set page to 1 when switching genres
    if (parsed.page) {
      parsed.page = 1;
    }

    const url = `?${queryString.stringify(parsed)}`;
    this.props.history.push(url); // with history

  }

  handleSave = () => {
    console.log(this.state.movies);
  };

  handleSort = (sortColumn) => {

    //preserve current query
    let parsed = queryString.parse(this.props.location.search);
    
    parsed.path = sortColumn.path;
    parsed.order = sortColumn.order;

    this.props.history.push(`?${queryString.stringify(parsed)}`); // with history

  }

  getPagedData = () => {
    const { pageSize, currentPage, movies: allMovies, currentGenre, sortColumn } = this.state;

    let moviesFiltered = allMovies;

    if (currentGenre !== 'All Genres') {
      moviesFiltered = allMovies.filter(x => x.genre.name === currentGenre);
    }

    const moviesSorted = _.orderBy(moviesFiltered, [sortColumn.path], [sortColumn.order]);

    const moviesPaginated = paginate(moviesSorted, currentPage, pageSize);

    return { totalCount: moviesFiltered.length, data: moviesPaginated };
  }

  render() {

    const { pageSize, currentPage, genres, currentGenre, sortColumn } = this.state;

    if (this.state.movies.length === 0) return <div>There are no movies in the database</div>;

    const result = this.getPagedData();

    return (
      <React.Fragment>
        <button onClick={this.handleSave} className="btn btn-primary m-2">Save all</button>
        <table className="table table-borderless">
          <tbody>
            <tr>
              <td>
                <ListGroup onItemChange={this.handleListgroup}
                  genres={genres}
                  currentGenre={currentGenre} />
              </td>
              <td>
                <p> Showing {result.totalCount} movies in the database</p>
                <MoviesTable
                  movies={result.data}
                  sortColumn={sortColumn}
                  onLikeClick={this.handleLikeToggle}
                  onProgressClick={this.handleProgressbar}
                  onMovieDelete={this.handleDelete}
                  onSort={this.handleSort} />
                <Pagination
                  itemsCount={result.totalCount}
                  pageSize={pageSize}
                  currentPage={currentPage}
                  onPageChange={this.handlePageChange} />
              </td>
            </tr>
          </tbody>
        </table>
      </React.Fragment>
    );
  }
}

export default Movies;
