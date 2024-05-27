import { useState } from "react";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
} from "reactstrap";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import * as PageRoutes from "./PageRouter.js";

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  return (
    <Router>
      <Navbar color="warning" light expand="md">
        <NavbarBrand href="/">ARC Global Championship</NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="ms-auto" navbar>
            <NavItem>
              <NavLink href="/">Home</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="/colosseums">Colosseums</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="/events">Events</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="/participants">Participants</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="/animals">Animals</NavLink>
            </NavItem>
          </Nav>
        </Collapse>
      </Navbar>
      <PageRoutes />
    </Router>
  );
};

export default Navigation;
