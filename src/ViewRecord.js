import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link, Redirect, Switch} from 'react-router-dom'
import { Form, FormGroup, ControlLabel, FormControl, Button, Table, Breadcrumb } from 'react-bootstrap'
import Nav from './Navigation'
import axios from "axios"
import "./ViewRecord.css"

class ViewRecord extends Component {
  constructor(props, context) {
    super(props, context);
    
    this.state = {
      recordId: props.location.search.split('?')[1].split('=')[1],
    }
  }

  componentDidUpdate = () => {
    console.log(this.state);
  }

  componentDidMount = () => {
    let url = "http://localhost:8080/record/get?id=" + localStorage.getItem("id") + "&token=" + localStorage.getItem("token") + "&query=" + this.state.recordId
    const _this = this;

    axios.get(url)
      .then(res => {
        _this.setState({
          ...res.data,
        })
      })
  }

  renderTable = () => {
    return (
      <div className="table">
        <Table striped bordered condensed hover responsive>
          <thead>
            <tr>
              <th>Email</th>
              <th>Username</th>
              <th>Birthday</th>
              <th>Password</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{this.state.email}</td>
              <td>{this.state.username}</td>
              <td>{this.state.birthdate}</td>
              <td>{this.state.password}</td>
            </tr>
          </tbody>
        </Table>
      </div>
    )
  }

  renderTitle = () => {
    return (
      <h1>{this.state.title}</h1>
    )
  }

  renderBreadCrumb = () => {
    return (
      <div className="bread">
        <Breadcrumb>
          <Breadcrumb.Item href="/home">All Records</Breadcrumb.Item>
          <Breadcrumb.Item active>{this.state.title}</Breadcrumb.Item>
        </Breadcrumb>
      </div>
    )
  }

  render() {
    return (
      <div>
        <Nav />
        {this.renderBreadCrumb()}
        {this.renderTitle()}
        {this.renderTable()}
      </div>
    )
  }
}

export default ViewRecord