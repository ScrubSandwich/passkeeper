import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link, Redirect, Switch} from 'react-router-dom'
import { Navbar, Nav, NavItem, NavDropdown, MenuItem } from 'react-bootstrap'

class Navigation extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: "Jacob",
    }
  }
  
  render() {
    const name = "Hello, " + this.state.name;
    return (
      <Navbar inverse collapseOnSelect>
        <Navbar.Header>
          <Navbar.Brand>
            <a href="/">Trash Pass</a>
          </Navbar.Brand>
        </Navbar.Header>
        <Nav pullRight>
          <NavItem eventKey={1} href="/new-record">
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
}

export default Navigation;