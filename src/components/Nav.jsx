import {
  Collapse,
  Navbar as ReactNavBar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
} from "reactstrap";
import { useState } from "react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  return (
    <ReactNavBar color="light" light expand="md" style={{ width: "100%" }}>
      <NavbarBrand href="/">Quiz App</NavbarBrand>
      <NavbarToggler onClick={toggle} />
      <Collapse isOpen={isOpen} navbar>
        <Nav className="ml-auto" navbar>
          <NavItem>
            <NavLink href="/test">Test</NavLink>
          </NavItem>
          <NavItem>
            <NavLink href="/">Home</NavLink>
          </NavItem>
          <NavItem>
            <NavLink href="/register">Register Login</NavLink>
          </NavItem>
          <NavItem>
            <NavLink href="/quizzes">Quiz</NavLink>
          </NavItem>
          <NavItem>
            <NavLink href="/users">User</NavLink>
          </NavItem>
        </Nav>
      </Collapse>
    </ReactNavBar>
  );
};
export default Navbar;
