import React from 'react';
import { Navbar, Nav, NavItem } from 'react-bootstrap';


export const TAB_NAME = 'tabName';

const LOGO = require('../../assets/logo.ico');
const TITLE = 'Budget Tracker';

export default function Header(props) {
  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Navbar.Brand href='/'>
        <img
          alt=""
          src={LOGO}
          width="30"
          height="30"
          className="d-inline-block align-top"
        />
        {TITLE}
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="mr-auto">
          {Object.keys(props.tabInfo).map(
            t => (
              <Nav.Link key={t}>
                <NavItem key={t} onClick={() => props.setPage(t)}>
                  {props.tabInfo[t][TAB_NAME]}
                </NavItem>
              </Nav.Link>
            )
          )}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}
