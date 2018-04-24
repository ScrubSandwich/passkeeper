import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link, Redirect, Switch} from 'react-router-dom'
import { Button, } from 'react-bootstrap'
import Header from './Header'
import './Welcome.css'

class Welcome extends Component {
  render() {
    return (
      <div className="welcome">
        < Header/>
        <div className="panel">
          <div className="heading">
            <strong><h2>Login or Sign Up</h2></strong>
          </div>          
          <div className="buttons">
            <div className="button">
              <Link to="/login"><Button bsStyle="success">Login</Button></Link>
            </div>        
            <div className="button">
              <Link to="/sign-up"><Button bsStyle="info">Sign Up</Button></Link>
            </div>
          </div>
          <div className="spacer">
            <h2>&#160;</h2>
            <h2>&#160;</h2>
            <h2>&#160;</h2>
          </div>
        </div>
      </div>
    )
  }
}

export default Welcome