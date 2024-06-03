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
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

import Test from "./forms/TestForm";
import RegisterForm from "./forms/RegisterForm";
import LoginForm from "./forms/LoginForm";

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
      <Routes>
        <Route
          path="/"
          element={
            <>
              <div
                style={{
                  display: "flex",
                  height: "80vh",
                  justifyContent: "center",
                  alignItems: "center",
                  flexDirection: "column",
                }}
              >
                <h1 style={{ margin: "100px" }}>Welcome to the Quiz App</h1>
                <Button variant="outline" label="hello">
                  <Link to="/welcome" style={{ color: "black", textDecoration: "none" }}>
                    Click to get started
                  </Link>
                </Button>
              </div>
            </>
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
    </Router>
  );
};

export default Navigation;
