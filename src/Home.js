import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link, Redirect, Switch} from 'react-router-dom'
import Nav from './Navigation'
import "./Home.css"

class Home extends Component {
  render() {
    return (
      <div className="home">
        <Nav />
      </div>
    )
  }
}

export default Home;