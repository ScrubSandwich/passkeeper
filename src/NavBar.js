import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link, Redirect, Switch} from 'react-router-dom'
import { Nav, NavItem, NavDropdown, MenuItem } from 'react-bootstrap'

class NavBar extends Component {
  render() {
    return (
      <Nav bsStyle="pills large" activeKey={4} >
        <NavItem eventKey={1} href="/home">
          NavItem 1 content
        </NavItem>
        <NavItem eventKey={2} title="Item">
          NavItem 2 content
        </NavItem>
        <NavDropdown eventKey={4} title="Account" id="nav-dropdown">
          <MenuItem eventKey="4.1">New Record</MenuItem>
          <MenuItem divider />
          <MenuItem eventKey="4.4">Logout</MenuItem>
        </NavDropdown>
      </Nav>
    )
  }
}

export default NavBar;