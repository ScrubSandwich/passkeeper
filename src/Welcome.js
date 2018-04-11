import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link, Redirect, Switch} from 'react-router-dom'
import { Button } from 'react-bootstrap'

class Welcome extends Component {
  render() {
    return (
      <div className="welcome">
        <header className="App-header">
          <h1 id="title">
            <span id="pass">PASS</span>
            <span id="keeper">
              <strong>keeper</strong>
            </span>
          </h1>
          <p className="intro">
            Your one-stop-shop for storing and managing your passwords securely
          </p>
        </header>
        <div className="option">
          <Link to="/login"><Button bsStyle="success">Login</Button></Link>
          <Link to="/sign-up"><Button>Sign Up</Button></Link>
        </div>
      </div>
    )
  }
}

export default Welcome