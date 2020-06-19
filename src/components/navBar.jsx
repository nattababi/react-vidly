import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class NavBar extends Component {
  state = {}
  render() {
    return (
      <nav className="navbar navbar-expand-md navbar-light" style={{ backgroundColor: '#e3f2fd' }}>
        <Link className="navbar-brand" to="/">Vidly</Link>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarNavAltMarkup"
          aria-controls="navbarNavAltMarkup"
          aria-expanded="false"
          aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item nav-link active">
              <Link className="nav-link" to="/movies">Movies<span className="sr-only">(current)</span></Link>
            </li>
            <li className="nav-item nav-link active">
              <Link className="nav-item nav-link" to="/customers">Customers</Link>
            </li>
            <li className="nav-item nav-link active">
              <Link className="nav-item nav-link" to="/rentals">Rentals</Link>
            </li>
            { this.props.user &&
               <React.Fragment>
               <li className="nav-item nav-link active">
             <Link className="nav-item nav-link" to="/profile">{this.props.user.name}</Link>
             </li>
            <li className="nav-item nav-link active">
              <Link className="nav-item nav-link" to="/logout">Logout</Link>
            </li>
            </React.Fragment>}
            { !this.props.user &&
              <React.Fragment>
              <li className="nav-item nav-link active">
              <Link className="nav-item nav-link" to="/login">Login</Link>
            </li>
            <li className="nav-item nav-link active">
              <Link className="nav-item nav-link" to="/register">Register</Link>
            </li>
            </React.Fragment>}
          </ul>
        </div>
      </nav>
    );
  }
}

export default NavBar;