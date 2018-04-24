import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link, Redirect, Switch} from 'react-router-dom'
import './Welcome.css'

class Header extends Component {
  render() {
    return (
      <div className="App-header">
        <Link to="/">
          <div className="title">
              <strong className="trash">pass</strong>
              <strong className="pass">keep</strong>
          </div>
        </Link>
        <p className="intro">
          A simple throw-away account information manager.
        </p>
      </div>
    )
  }
}

export default Header;