import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link, Redirect, Switch} from 'react-router-dom'
import { FormGroup, ControlLabel, FormControl } from 'react-bootstrap'
import Nav from './Navigation'
import axios from "axios"
class Login extends Component {

  constructor(props, context) {
    super(props, context);

    this.handleChangeEmail = this.handleChangeEmail.bind(this);
    this.handleChangePassword = this.handleChangePassword.bind(this);

    this.state = {
      email: "",
      password: "",
    }
  }

  componentDidUpdate = () => {
    console.log(this.state)
  }

  getValidationStateEmail = () => {
    const email = this.state.email;

    if (email.length === 0) { return null; }
    var regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (regex.test(String(email).toLowerCase())) {
      return "success";
    }
    return "error"; 
  }

  getValidationStatePassword = () => {
    const length = this.state.password.length;
    if (length > 8) return 'success';
    else if (length > 0) return 'error';
    return null;
  }

  handleChangeEmail = (e) => {
    this.setState({ email: e.target.value });
  }

  handleChangePassword = (e) => {
    this.setState({ password: e.target.value});
  }

  renderLoginForm = () => {
    return (
      <form>
        <FormGroup controlId="email" bsSize="large" validationState={this.getValidationStateEmail()}>
          <ControlLabel>Email</ControlLabel>
          <FormControl
            type="text"
            value={this.state.email}
            placeholder="Email"
            onChange={this.handleChangeEmail}
          />
        </FormGroup>
        <FormGroup controlId="password" bsSize="large" validationState={this.getValidationStatePassword()}>
          <ControlLabel>Password</ControlLabel>
          <FormControl
            type="password"
            value={this.state.password}
            placeholder="Password"
            onChange={this.handleChangePassword}
          />
        </FormGroup>
      </form>
    )
  }

  render() {
    return (
      <div className="login">
        <Nav />
        <div className="form">
          {this.renderLoginForm()}
        </div>
      </div>
    )
  }
}

export default Login;