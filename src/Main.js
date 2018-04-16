import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link, Redirect, Switch} from 'react-router-dom'
import Welcome from './Welcome'
import SignUp from './SignUp';
import Login from './Login';
import './Main.css'

class Main extends Component {

  renderLinks = () => {
    return (
      <p>p</p>
    )
  }
  
  render() {
    return (
      <div className="main">
        <div className="links">          
          <Switch>          
            <Route exact path="/" component={Welcome} />
            <Route path="/sign-up" component={SignUp} />
            <Route path="/login" component={Login} />
          </Switch>
        </div>
      </div>
    )
  }
}

export default Main;