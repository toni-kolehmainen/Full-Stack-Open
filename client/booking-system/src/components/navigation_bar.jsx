
// Title
// name
// password
// link to register screen and back to home button
// Forgot Password?
import { useEffect, useState } from 'react';
// import SignButton from '../../components/sign_button'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import axios from 'axios'
import { useLocation } from "react-router-dom";

import { IoIosGlobe, IoIosHeartEmpty, IoIosMenu, IoMdPerson } from "react-icons/io";

function NavigationBar() {
  const location = useLocation();


  const navigation = [
    {
      name: "Home",
      href: "/"
    },
    {
      name: "Login",
      href: "/login"
    },
    {
      name: "Register",
      href: "/register"
    }
  ]

  return (
    <>
      <Navbar bg="dark" data-bs-theme="dark">
        <Container>
          <Navbar.Brand href="/">Navbar</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link ><IoIosHeartEmpty/> Favorities</Nav.Link>
            <Nav.Link href="/login"><IoMdPerson /> Login</Nav.Link>
            <Nav.Link href="/login"><IoIosGlobe /> lan/currency</Nav.Link>
            <Nav.Link href="/login"><IoIosMenu /> lan/currency</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
    </>
  );
}

export default NavigationBar;