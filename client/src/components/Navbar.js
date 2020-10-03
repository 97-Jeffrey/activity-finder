import React from 'react';
// import { Link } from "react-router-dom";
import "../css/toolbar.css"

import { Navbar, Nav, Button } from 'react-bootstrap';

export default function NavigBar() {

  return (
    <>

      <Navbar sticky="top" bg="dark" variant="dark">
        <Navbar.Brand href="/">
          <img
            alt="ActivityGo Logo"
            src={require('../assets/ActivityGo_logo.png')}
            width="50"
            height=""
            className="d-inline-block align-top"
          />{' '}


        </Navbar.Brand>
        <Nav className="mr-auto">
          <Nav.Link href="/favorites">My favorites</Nav.Link>
          <Nav.Link href="/bookings">My bookings</Nav.Link>

        </Nav>
        <Navbar.Toggle />
        <Navbar.Collapse className="justify-content-end">
          <Navbar.Text>
            Signed in as: <a href="#login">John Doe</a>
          </Navbar.Text>
          <Button variant="info">Sign Out</Button>{' '}
        </Navbar.Collapse>
      </Navbar>


    </>
  )
}

