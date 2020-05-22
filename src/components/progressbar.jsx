import React, { Component } from 'react';

class ProgressBar extends Component {
  render() {
    return (
      <div onClick={this.props.onClick} className="progress">
        <div className="progress-bar progress-bar-striped progress-bar-animated"
          role="progressbar" style={{ width: this.props.now * 10 + '%' }}
          aria-valuenow={this.props.now} aria-valuemin="0" aria-valuemax="10">
          {this.props.now}
        </div>
      </div>
    );
  }
}

export default ProgressBar;