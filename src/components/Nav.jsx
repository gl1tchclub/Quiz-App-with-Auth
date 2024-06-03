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
    <ReactNavBar className="bg-gray-800 text-gray-300 py-6" light expand="md" style={{ width: "100%" }}>
      <NavbarBrand className="text-2xl font-bold text-white" href="/">Quiz App</NavbarBrand>
      <NavbarToggler onClick={toggle} />
      <Collapse isOpen={isOpen} navbar>
        <Nav className="ml-auto" navbar>
          <div className="font-medium inline-flex">
          <NavItem >
            <NavLink className="text-white" href="/register">Register</NavLink>
          </NavItem>
          <NavItem>
            <NavLink className="text-white" href="/">Home</NavLink>
          </NavItem>
          <NavItem>
            <NavLink className="text-white" href="/oldreg">Old</NavLink>
          </NavItem>
          <NavItem>
            <NavLink className="text-white" href="/quizzes">Quiz</NavLink>
          </NavItem>
          <NavItem>
            <NavLink className="text-white" href="/users">User</NavLink>
          </NavItem>
          </div>
        </Nav>
      </Collapse>
    </ReactNavBar>
  );
};
export default Navbar;
