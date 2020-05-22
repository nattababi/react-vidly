import React, { Component } from 'react';
import Input from './input';

class LoginForm extends Component {
  state = {
    account: { username: '', password: '' }
  };

  username = React.createRef();
  handleSubmit = (e) => {
    e.preventDefault();

    //const username = this.username.current.value;
    console.log('Submitted');
  };

  handleChange = (e) => {
    const account = { ...this.state.account };
    account[e.currentTarget.name] = e.currentTarget.value;
    this.setState({ account })
  }
  componentDidMount() {
    //this.username.current.focus();
  }

  render() {
    const { account } = this.state;

    return (
      <div>
        <h1>Login Form</h1>
        <form onSubmit={this.handleSubmit}>
          <Input
            name="username"
            value={account.username}
            label="Username"
            onChange={this.handleChange}/>
            
          <Input
            name="password"
            value={account.password}
            label="Password"
            onChange={this.handleChange}/>

          <button className="btn btn-primary">Login</button>
        </form>
      </div>
    );
  }
}

export default LoginForm;