import React, { Component } from 'react';

class ListGroup extends Component {
  render() {
    const genres = this.props.genres;

    return (
      <ul className="list-group">
        {genres.map(genre =>
          <li style={{ width: '32px' }} key={genre._id} onClick={() => this.props.onItemChange(genre.name)}
            className={genre.name === this.props.currentGenre ? "list-group-item active clickable" : "list-group-item clickable"}>
              {genre.name}</li>
        )}
      </ul>
    );
  }
}

export default ListGroup;