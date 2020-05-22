export function paginate(items, pageNumber, pageSize) {
  const startIndex = (pageNumber - 1) * pageSize;
  return items.slice(startIndex, startIndex + pageSize);
};

export function prepareAndPaginate(movies, currentGenre, currentPage, pageSize) {

  let allMoviesFiltered;

  if (currentGenre !== 'All Genres') {
    allMoviesFiltered = movies.filter(x => x.genre.name === currentGenre);
  }
  else {
    allMoviesFiltered = movies;
  };

  const moviesPaginated = paginate(allMoviesFiltered, currentPage, pageSize);
  return moviesPaginated;
};