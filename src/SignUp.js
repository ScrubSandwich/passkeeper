import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link, Redirect, Switch} from 'react-router-dom'
import Nav from './NavBar'

class SignUp extends Component {
  render() {
    return (
      <div className="signup">
        <Nav />
      </div>
    )
  }
}

export default SignUp;