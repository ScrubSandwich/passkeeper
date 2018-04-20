import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link, Redirect, Switch} from 'react-router-dom'
import { Button } from 'react-bootstrap'
import './Welcome.css'

class Welcome extends Component {
  render() {
    return (
      <div className="welcome">
        <header className="App-header">
          <h1 id="title">
            <span id="pass">trash</span>
            <span id="keeper">
              <strong>pass</strong>
            </span>
          </h1>
          <p className="intro">
            Your one-stop-shop for storing and managing your throw-away passwords
          </p>
        </header>
        <div className="panel">
          <div className="heading">
            <h2>Login or Sign Up</h2>
          </div>
          
          <div className="buttons">
            <div className="button">
              <Link to="/login"><Button bsStyle="success">Login</Button></Link>
            </div>        
            <div className="button">
              <Link to="/sign-up"><Button bsStyle="info">Sign Up</Button></Link>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Welcome