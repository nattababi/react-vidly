import React, { Component } from 'react';

class LikeToggle extends Component {

  getLikeClass = () => {
    return `fa fa-heart${this.props.isLiked ? '' : '-o'}`;
  }

  render() {
    return (<i onClick={this.props.onToggle} className={this.getLikeClass()}> </i>);
  }
}

export default LikeToggle;