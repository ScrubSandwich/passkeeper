import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link, Redirect, Switch} from 'react-router-dom'
import Nav from './NavBar'

class Login extends Component {
  render() {
    return (
      <div className="login">
        <Nav />
      </div>
    )
  }
}

export default Login;