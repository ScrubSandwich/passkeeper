import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link, Redirect, Switch} from 'react-router-dom'
import { Table } from 'react-bootstrap'
import Nav from './Navigation'
import "./Home.css"

class Home extends Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      records: [],
    }
  }

  componentDidUpdate = () => {
    console.log(this.state)
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
        <h1>All Records</h1>
        <div className="records">
          <Table striped bordered condensed hover responsive>
            <thead>
              <tr>
                <th>Number</th>
                <th>Title</th>
              </tr>
            </thead>
            <tbody>              
                {this.state.records.map((record, index) =>
                  <tr>
                    <td>
                      <h2>{index + 1}</h2>
                    </td>
                    <td>
                      <div className="record" key={index}>
                        <Link to={"/view-record?id=" + record.record_id}>
                          <h2>{record.title}</h2>
                        </Link>
                      </div>
                    </td>
                  </tr>
                )}              
            </tbody>
          </Table>     
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