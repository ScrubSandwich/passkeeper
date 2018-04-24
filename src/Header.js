import React, { Component } from 'react';
import './Welcome.css'

class Header extends Component {
  render() {
    return (
      <div className="App-header">
        <div className="title">
            <strong className="trash">pass</strong>
            <strong className="pass">keep</strong>
        </div>
        <p className="intro">
          A simple throw-away account information manager.
        </p>
      </div>
    )
  }
}

export default Header;