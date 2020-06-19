import React, { Component } from 'react';
import auth from '../services/authService';
import { Route, Redirect } from 'react-router-dom';
import { reduceRight } from 'lodash';

class ProtectedRoute extends Component {
  state = {}
  render() {
    const { path, component: Component, render, ...rest } = this.props;
    return (
      <Route
        {...rest}
        render={props => {
          if (!auth.getCurrentUser()) return <Redirect to={{
            pathname: "/login",
            state: {from: props.location}
          }} />
          return Component ? <Component {...props} /> : render(props);
        }
        } />
    );
  }
}

export default ProtectedRoute;