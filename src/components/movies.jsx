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

  //unlisten = null;

  state = {
    movies: getMovies(),
    genres: getGenresExtended(),
    currentPage: 1,
    pageSize: 4,
    currentGenre: "All Genres",
    sortColumn: { path: "title", order: 'asc' }
  };

  webHistoryListener = (location, action) => {
    console.log(">>>>>>on route change");
    console.log(location);
    
  }

  // componentWillUnmount() {
  //   //console.log('>>> COMPONENT WILL UNMOUNT');
  //   //this.unlisten();
  // }
  
  componentDidMount() {
    
    console.log('componentDidMount - MOVIES');
    
    //this.unlisten = this.props.history.listen(this.webHistoryListener);

    const parsed = queryString.parse(this.props.location.search);

    const newState = {};

    if (parsed.page) {
      newState.currentPage = Number(parsed.page);
    };

    if (parsed.filter) {
      newState.currentGenre = parsed.filter;
    }
    else{
      newState.currentGenre = 'All Genres';
    }

    if (parsed.sortBy && parsed.orderBy) {
      newState.sortColumn = { path: parsed.sortBy, order: parsed.orderBy };
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
    //this.setState({ currentPage: page });

    //preserve current query
    let parsed = queryString.parse(this.props.location.search);
    let newAddOn='';

      if (parsed.page) {
        parsed.page = page;
      }
      else{
        //newAddOn = `&page=${page}`;
        newAddOn = (!parsed.filter && !parsed.sortBy && !parsed.orderBy) ? `page=${page}` : `&page=${page}`
      }

    console.log ('newAddOn=', newAddOn);
    console.log('history.push', `?${queryString.stringify(parsed)}${newAddOn}`);
    this.props.history.push(`?${queryString.stringify(parsed)}${newAddOn}`); // with history
  }

  handleListgroup = (name) => {
    this.setState({ currentGenre: name, currentPage: 1 });
    //
    // if (name !== 'All Genres') {
    //   this.props.history.push(`?filter=${name}`);
    // }
    // else{
    //   //goto movies
    //   this.props.history.push(`/movies`);
    // }
  }

  handleSave = () => {
    console.log(this.state.movies);
  };

  handleSort = (sortColumn) => {
    
    //console.log('sortColumn', sortColumn.path, sortColumn.order);

    this.setState({ sortColumn });

    // this.setState({ currentPage: page });

    // //preserve current query
    // let parsed = queryString.parse(this.props.location.search);
    // let newAddOn='';

    //   if (parsed.page) {
    //     parsed.page = page;
    //   }
    //   else{
    //     newAddOn = (!parsed.filter && !parsed.sortBy && !parsed.orderBy) ? `page=${page}` : `&page=${page}`
    //   }

    // this.props.history.push(`?${queryString.stringify(parsed)}${newAddOn}`); // with history

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
