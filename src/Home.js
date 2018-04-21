import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link, Redirect, Switch} from 'react-router-dom'
import Nav from './Navigation'
import "./Home.css"

class Home extends Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      records: [{"title": "Gmail Throwaway 1", "id": 1}, {"title": "yahoo", "id": 2}],
    }
  }

  renderRecords = () => {
    return (
      <div>
        <h1>Records</h1>
        <div className="records">
            {this.state.records.map((record) =>
              <div className="record">
                <Link to={"/view-thread?id=" + record.id}>
                  <h2>{record.title}</h2>
                </Link>
              </div>
            )}       
        </div>
      </div>
    );
  }

  render() {
    return (
      <div className="home">
        <Nav />
        {this.renderRecords()}
      </div>
    )
  }
}

export default Home;