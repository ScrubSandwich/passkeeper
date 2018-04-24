import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link, Redirect, Switch} from 'react-router-dom'
import { Alert } from 'react-bootstrap'
import Nav from './Navigation'
import "./Home.css"

class Home extends Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      records: [],
    }
  }

  getLocalStorage = (key) => {
    return localStorage.getItem(key);
  }

  componentWillMount = () => {
    const _this = this;

    let payload = JSON.stringify({
      "userId": this.getLocalStorage("id"),
      "token": this.getLocalStorage("token"),
    });

    fetch("http://localhost:8080/record/list", {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json;charset=UTF-8',
        'transfer-encoding': 'chunked',
      },
      body: payload,
    })
    .then(function(response) {
      response.json().then(json => {
        if (json.status == "OK") {
          _this.setState({
            records: json.list,
          })
        } else {
          alert("Unable to connect to the server.")
        }
      });
    })
  }

  renderRecords = () => {
    if (this.state.records.length == 0) {
      return (
        <h3>No records yet! Click the "New Record" button above to create a record.</h3>
      )
    } 
    
    return (
      <div>
        <h1>Records</h1>
        <div className="records">
            {this.state.records.map((record, index) =>
              <div className="record" key={index}>
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