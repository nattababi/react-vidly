import _ from 'lodash';

export function paginate(items, pageNumber, pageSize){

  //console.log('inside paginate', items, pageNumber, pageSize)
  const startIndex = (pageNumber - 1)*pageSize;

  //_.slice(items, startIndex);
  //_take();

  //return _(items).slice(startIndex).take(pageSize).value();

  //console.log('slice',startIndex, startIndex + pageSize);

  return items.slice(startIndex, startIndex + pageSize);
};

export function prepareAndPaginate (movies, currentGenre, currentPage, pageSize) {

  let allMoviesFiltered;

  if (currentGenre !== 'All Genres') {
    allMoviesFiltered = movies.filter(x => x.genre.name === currentGenre);
  }
  else{
    allMoviesFiltered = movies;
  };

  const moviesPaginated = paginate(allMoviesFiltered, currentPage, pageSize);
  
  return moviesPaginated;
};