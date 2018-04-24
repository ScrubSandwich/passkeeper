import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link, Redirect, Switch} from 'react-router-dom'
import { Navbar, Nav, NavItem, NavDropdown, MenuItem, Modal, OverlayTrigger, Button, Form, FormControl, FormGroup, ControlLabel } from 'react-bootstrap'

class Navigation extends Component {
  constructor(props, context) {
    super(props, context);

    this.handleShow = this.handleShow.bind(this);
    this.handleClose = this.handleClose.bind(this);

    this.state = {
      show: false,
      title: "",
      email: "",
      password: "",
      username: "",
      birthdate: "",
    }
  }

  componentDidUpdate = () => {
    //console.log(this.state)
  }

  handleClose() {
    this.setState({ show: false });
  }

  handleShow() {
    this.setState({ show: true });
  }

  renderNav = () => {
    const name = "Hello, " + localStorage.getItem('email');

    return (
      <Navbar inverse collapseOnSelect>
        <Navbar.Header>
          <Navbar.Brand>
            <a href="/">Trash Pass</a>
          </Navbar.Brand>
        </Navbar.Header>
        <Nav pullRight>
          <NavItem eventKey={1} onClick={this.handleShow} >
            New Record
          </NavItem>
          <NavDropdown eventKey={2} title={name} id="basic-nav-dropdown">
            <NavItem eventKey={2.1} href="/account">
              Account
            </NavItem>
            <MenuItem divider />
            <MenuItem eventKey={2.2}>Logout</MenuItem>
          </NavDropdown>
        </Nav>
      </Navbar>
    )
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const _this = this;

    const id = localStorage.getItem("id");
    const token = localStorage.getItem("token");

    let payload = JSON.stringify({
      "userId": id,
      "token": token,
      "email": this.state.email,
      "password": this.state.password,
      "title": this.state.title,
      "username": this.state.username,
      "birthdate": this.state.birthdate,
    });

    fetch("http://passkeep.herokuapp.com/record/add", {
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
        console.log(json)
        if (json.status == "OK") {
          _this.handleClose();
        } else {
          alert("Error accessing database. Please try again later")
        }
      });
    })
  }

  handleChangeTitle = (e) => {
    this.setState({ title: e.target.value});
  }
  
  handleChangeEmail = (e) => {
    this.setState({ email: e.target.value});
  }

  handleChangePassword = (e) => {
    this.setState({ password: e.target.value});
  }

  handleChangeUsername = (e) => {
    this.setState({ username: e.target.value});
  }

  handleChangeBirthdate = (e) => {
    this.setState({ birthdate: e.target.value});
  }

  renderModal = () => {
    return (
      <Modal show={this.state.show} onHide={this.handleClose}>
        <Form onSubmit={this.handleSubmit}>
          <Modal.Header closeButton>
            <Modal.Title> Create New Record</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <FormGroup controlId="title" bsSize="large">
              <ControlLabel>Title</ControlLabel>
              <FormControl
                type="text"
                value={this.state.title}
                placeholder="Title"
                onChange={this.handleChangeTitle}
              />
            </FormGroup>
            <FormGroup controlId="email" bsSize="large">
              <ControlLabel>Email</ControlLabel>
              <FormControl
                type="text"
                value={this.state.email}
                placeholder="Email"
                onChange={this.handleChangeEmail}
              />
            </FormGroup>
            <FormGroup controlId="username" bsSize="large">
              <ControlLabel>Username</ControlLabel>
              <FormControl
                type="text"
                value={this.state.username}
                placeholder="Username"
                onChange={this.handleChangeUsername}
              />
            </FormGroup>
            <FormGroup controlId="birthdate" bsSize="large">
              <ControlLabel>Birthday</ControlLabel>
              <FormControl
                type="text"
                value={this.state.birthdate}
                placeholder="Birthday"
                onChange={this.handleChangeBirthdate}
              />
            </FormGroup>
            <FormGroup controlId="password" bsSize="large">
              <ControlLabel>Password</ControlLabel>
              <FormControl
                type="password"
                value={this.state.password}
                placeholder="Password"
                onChange={this.handleChangePassword}
              />
            </FormGroup>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={this.handleSubmit}>Submit</Button>
          </Modal.Footer>
        </Form>
      </Modal>
    )
  }
  
  render() {
    return (
      <div>
        {this.renderNav()}
        {this.renderModal()}
      </div>  
    )
  }
}

export default Navigation;