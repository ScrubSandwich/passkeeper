import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link, Redirect, Switch} from 'react-router-dom'
import { Navbar, Nav, NavItem, NavDropdown, MenuItem, Modal, OverlayTrigger, Button } from 'react-bootstrap'

class Navigation extends Component {
  constructor(props, context) {
    super(props, context);

    this.handleShow = this.handleShow.bind(this);
    this.handleClose = this.handleClose.bind(this);

    this.state = {
      name: localStorage.getItem('name'),
      show: false,
    }
  }

  handleClose() {
    this.setState({ show: false });
  }

  handleShow() {
    this.setState({ show: true });
  }

  renderNav = () => {
    const name = "Hello, " + this.state.name;

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
    console.log('sd')
  }

  renderModal = () => {
    return (
      <Modal show={this.state.show} onHide={this.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title> Create New Record</Modal.Title>
          </Modal.Header>
          <Modal.Body>

          </Modal.Body>
          <Modal.Footer>
            <Button onClick={this.handleSubmit}>Submit</Button>
          </Modal.Footer>
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