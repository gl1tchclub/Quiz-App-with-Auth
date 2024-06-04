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
    <ReactNavBar
      className="bg-pink-300 text-pink-500 py-6"
      light
      expand="md"
      style={{ width: "100%" }}
    >
      <NavbarBrand className="text-2xl font-bold" href="/">
        <h3 className="text-pink-500">Quiz App</h3>
      </NavbarBrand>
      <NavbarToggler onClick={toggle} />
      <Collapse isOpen={isOpen} navbar>
        <Nav className="ml-auto" navbar>
          <div className="font-medium inline-flex">
            <NavItem>
              <NavLink href="/register">
                <div className="text-pink-500 hover:text-white">Register</div>
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="/login">
                <div className="text-pink-500 hover:text-white">Login</div>
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="/">
                <div className="text-pink-500 hover:text-white">Home</div>
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="/quizzes">
                <div className="text-pink-500 hover:text-white">Quizzes</div>
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="/users">
                <div className="text-pink-500 hover:text-white">User</div>
              </NavLink>
            </NavItem>
          </div>
        </Nav>
      </Collapse>
    </ReactNavBar>
  );
};
export default Navbar;
