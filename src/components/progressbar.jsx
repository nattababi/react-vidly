import React, { Component } from 'react';

class ProgressBar extends Component {
  state = {}
  render() {
    //console.log('progress', this.props.now);
    return (
      <div onClick={this.props.onClick} className="progress">
        <div className="progress-bar progress-bar-striped progress-bar-animated" role="progressbar" style={{ width: this.props.now * 10 + '%' }} aria-valuenow={this.props.now} aria-valuemin="0" aria-valuemax="10">{this.props.now}</div>
      </div>
    );
  }
}

export default ProgressBar;
      // <div className="progress" onClick={this.props.onClick}>
      //   <div className="progress-bar" role="progressbar" aria-valuenow="9"
      //     aria-valuemin="0" aria-valuemax="10" style={{'width':100}}>
      //     <span className="sr-only">70% Complete</span>
      //   </div>
      // </div>