import React, { Component, Fragment } from 'react';
import { Navbar, Nav, NavItem } from 'react-bootstrap';


export const TAB_NAME = 'tabName'

const LOGO = require('../assets/logo.ico')
const TITLE = 'Budget Tracker'

export default class Header extends Component {
    constructor(props) {
      super(props);
      this.state = { tabInfo: props.tabInfo, setPage: props.setPage};
    }

    render() {
      return (
        <Fragment>
          <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
            <Navbar.Brand href="#home">
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
                  {Object.keys(this.state.tabInfo).map(
                    t => (<Nav.Link key={t}><NavItem key={t} onClick={() => this.props.setPage(t)}>{this.state.tabInfo[t][TAB_NAME]}</NavItem></Nav.Link>)
                  )}
                </Nav>
              </Navbar.Collapse>
          </Navbar>
        </Fragment>
      )
    }
  }
