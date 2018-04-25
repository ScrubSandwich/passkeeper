import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link, Redirect, Switch} from 'react-router-dom'
import { Table, Breadcrumb, Button } from 'react-bootstrap'
import Nav from './Navigation'
import "./Home.css"

class Home extends Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      records: [],
      delete: false,
    }
  }

  componentDidUpdate = () => {
    //console.log(this.state)
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

    fetch("https://passkeep.herokuapp.com/record/list", {
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

  handleDelete = (id) => {    
    const _this = this;
    const idUser = localStorage.getItem("id");
    const token = localStorage.getItem("token");

    let payload = JSON.stringify({
      "userId": idUser,
      "token": token,
      "recordId": id,
    });

    fetch("https://passkeep.herokuapp.com/record/delete", {
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
          console.log(json)
          alert("Record Deleted")
          window.location.reload();
        } else {
          alert(json.message)
        }
      });
    })
  }

  renderButton = (id) => {
    if (this.state.delete) {
      return (
        <div className="button">
          <div className="delete">
            <Button bsStyle="danger" onClick={(e) =>{
              {this.handleDelete(id)}
            }}>
              Delete Record
            </Button>
          </div>
        </div>
      )
    }    
  }

  renderRecords = () => {
    if (this.state.records.length == 0) {
      return (
        <h3>No records yet! Click the "New Record" button above to create a record.</h3>
      )
    }

    var recordStyle = {};

    //If delete button is hit, then use these style
    if (this.state.delete) {
      recordStyle = {
        display: 'grid',
        gridTemplateColumns: '300px 50px',
      }
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
                  <tr key={index}>
                    <td>
                      <h2>{index + 1}</h2>
                    </td>
                    <td>
                      <div className="record" key={index} style={recordStyle}>
                        <Link to={"/view-record?id=" + record.record_id}>
                          <h2>{record.title}</h2>
                        </Link>
                        {this.renderButton(record.record_id)}
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

  renderBread = () => {
    return (
      <div className="bread">
        <Breadcrumb>
          <Breadcrumb.Item active>All Records</Breadcrumb.Item>
        </Breadcrumb>
      </div>
    )
  }

  renderDeleteButton = () => {
    return (
      <div className="deleteButton">
        <Button onClick={this.toggleDelete} bsStyle="warning">Delete A Record</Button>
      </div>
    )
  }

  toggleDelete = () => {
    const s = !this.state.delete;
    this.setState({ delete: s, })
  }

  render() {
    return (
      <div className="home">
        <Nav />
        <div className="top">
          {this.renderBread()}
          {this.renderDeleteButton()}
        </div>
        {this.renderRecords()}
      </div>
    )
  }
}

export default Home;