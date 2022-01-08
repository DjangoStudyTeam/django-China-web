import * as React from 'react';

import { Container, Nav, Navbar } from 'react-bootstrap';

import { Outlet } from 'react-router-dom';
import logo from '../logo.svg';

const Layout = () => {
  return (
    <Container>
      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href="/home">
            <img alt="" src={logo} width="30" height="30" className="d-inline-block align-top" />{' '}
            React Bootstrap
          </Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="/home">Home</Nav.Link>
            <Nav.Link href="/test">Test</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
      <Outlet />
    </Container>
  );
};

export default Layout;
