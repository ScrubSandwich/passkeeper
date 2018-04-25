import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link, Redirect, Switch} from 'react-router-dom'
import { Form, FormGroup, ControlLabel, FormControl, Button } from 'react-bootstrap'
import Header from './Header'
import axios from "axios"
import "./SignUp.css"

class SignUp extends Component {
  constructor(props, context) {
    super(props, context);

    this.handleChangeEmail = this.handleChangeEmail.bind(this);
    this.handleChangePassword = this.handleChangePassword.bind(this);
    this.saveToLocalStorage = this.saveToLocalStorage.bind(this);

    this.state = {
      email: "",
      password: "",
      password2: "",
      redirect: false,
    }
  }

  saveToLocalStorage = (key, data) => {
    localStorage.setItem(key, data);
  }

  componentDidUpdate = () => {
    //console.log(this.state)
  }

  getValidationStateEmail = () => {
    return "success";
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

  handleChangePassword2 = (e) => {
    this.setState({ password2: e.target.value});
  }

  login = () => {
    const _this = this;

    let payload = JSON.stringify({
      "email": this.state.email,
      "password": this.state.password,
    });

    fetch("https://passkeep.herokuapp.com/login", {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json;charset=UTF-8',
        'transfer-encoding': 'chunked',
      },
      body: payload,
    })
    .then(function(response) {
      response.json().then(json => {
        if (json.status == "OK") {
          console.log("Login successful")
          _this.saveToLocalStorage("token", json.token);
          _this.saveToLocalStorage("id", json.userId);
          _this.saveToLocalStorage("email", json.email);

          _this.setState({
            redirect: true,
          })
        } else {
          alert(json.message)
        }
      });
    })
  }

  handleSubmit = (e) => {
    e.preventDefault();

    //See if username is not blank
    if (this.state.email.length == 0) {
      alert("Please enter in a username")
      return;
    }

    //See if password is of length
    if (this.state.password.length < 8) {
      alert("Password needs to be at least 8 characters long")
      return;
    }

    //See if passwords match
    if (this.state.password !== this.state.password2) {
      alert("Passwords do not match")
      return;
    }
    const _this = this;

    let payload = JSON.stringify({
      "email": this.state.email,
      "password": this.state.password,
    });

    fetch("https://passkeep.herokuapp.com/sign-up", {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json;charset=UTF-8',
        'transfer-encoding': 'chunked',
      },
      body: payload,
    })
    .then(function(response) {
      response.json().then(json => {
        if (json.status == "OK") {
          console.log("Sign Up succesfull")
          _this.login();
        } else {
          alert(json.message)
        }
      });
    })
  }

  renderSignUpForm = () => {
    return (
      <div className="formm">
        <Form onSubmit={this.handleSubmit}>
          <FormGroup controlId="email" bsSize="large" validationState={this.getValidationStateEmail()}>
            <ControlLabel>Username</ControlLabel>
            <FormControl
              type="text"
              value={this.state.email}
              placeholder="Username"
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
          <FormGroup controlId="password2" bsSize="large" validationState={this.getValidationStatePassword()}>
            <ControlLabel>Repeat Password</ControlLabel>
            <FormControl
              type="password"
              value={this.state.password2}
              placeholder="Repeat Password"
              onChange={this.handleChangePassword2}
            />
          </FormGroup>
          <Button type="submit">Submit</Button>
        </Form>
      </div>
    )
  }

  renderRedirect = () => {
    if (this.state.redirect) { return (<Redirect to="/home" />) }
  }

  render() {
    return (
      <div className="signup">
        <Header />
        <div className="heading">
          <strong><h1>Sign Up</h1></strong>
        </div>        
        <div className="form">
          {this.renderSignUpForm()}
        </div>
        {this.renderRedirect()}
      </div>
    )
  }
}

export default SignUp;