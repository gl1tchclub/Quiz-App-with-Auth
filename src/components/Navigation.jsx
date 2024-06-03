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

import Test from "./forms/TestForm";
import RegisterForm from "./forms/RegisterForm";
import LoginForm from "./forms/LoginForm";
import CardWrapper from "./CardWrapper";

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  return (
    <Router>
      <Navbar color="warning" light expand="md" style={{ width: "100%" }}>
        <NavbarBrand href="/">Quiz App</NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="ms-auto" navbar>
            <NavItem>
              <NavLink href="/">Home</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="/welcome">Register Login</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="/quizzes">Quiz</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="/users">User</NavLink>
            </NavItem>
          </Nav>
        </Collapse>
      </Navbar>
      <section class="container mx-auto h-screen">
      <div class=" flex items-center justify-center">
      <Routes>
        <Route
          path="/"
          element={
            <CardWrapper
              title="Welcome to the Quiz App"
              variant="outline"
              href="/welcome"
              label="Made by Mintep1"
              buttonLabel="Click to get started!"
            ></CardWrapper>
          }
        ></Route>
        <Route
          path="/welcome"
          element={
            <>
              <div style={{ display: "flex", justifyContent: "center" }}>
                <RegisterForm />
                {/* <LoginForm /> */}
              </div>
            </>
          }
        />
        <Route
          path="/login"
          element={
            <>
              <div style={{ display: "flex", justifyContent: "center" }}></div>
            </>
          }
        />
        <Route
          path="/test"
          element={
            <>
              <div style={{ display: "flex", justifyContent: "center" }}>
                <Test />
              </div>
            </>
          }
        />
        <Route
          path="/quizzes"
          element={
            <>
              <div style={{ display: "flex", justifyContent: "center" }}>
                Quizzes
              </div>
            </>
          }
        />
        <Route
          path="/users"
          element={
            <>
              <div style={{ display: "flex", justifyContent: "center" }}>
                Users
              </div>
            </>
          }
        />
        <Route
          path="/user"
          element={
            <>
              <div style={{ display: "flex", justifyContent: "center" }}>
                User
              </div>
            </>
          }
        />
      </Routes>
      </div>
      </section>
    </Router>
  );
};

export default Navigation;
