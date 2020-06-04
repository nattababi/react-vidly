import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import Movies from './components/movies';
import NavBar from './components/navBar';
import Customers from './components/customers';
import Rentals from './components/rentals';
import MovieDetails from './components/movieDetails'
import NotFound from './components/notFound';
import LoginForm from './components/loginForm';
import RegisterForm from './components/registerForm';
import './App.css';

function App() {
  return (
    <main className="container">
      <NavBar/>
      <Switch>
        <Route path="/movies/:id" component={MovieDetails}/>
        <Route path="/movies" component={Movies}/>
        <Route path="/customers" component={Customers}/>
        <Route path="/rentals" component={Rentals}/>
        <Route path="/not-found" component={NotFound}/>
        <Route path="/login" component={LoginForm}/>
        <Route path="/register" component={RegisterForm}/>
        <Redirect exact from="/" to="/movies"/>
        <Redirect to="/not-found"/>
      </Switch>
    </main>
  );
}

export default App;
