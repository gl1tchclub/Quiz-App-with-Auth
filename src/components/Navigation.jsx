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
// import {
//   CDBFooter,
//   CDBFooterLink,
//   CDBBtn,
//   CDBIcon,
//   CDBContainer,
// } from "cdbreact";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import RegisterForm from "./forms/RegisterForm";
import LoginForm from "./forms/LoginForm";

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  return (
    <Router>
      <Navbar color="warning" light expand="md">
        <NavbarBrand href="/">Quiz App</NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="ms-auto" navbar>
            <NavItem>
              <NavLink href="/">Home</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="/register" element={<RegisterForm />}>
                Register
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="/login" element={<LoginForm />}>
                Login
              </NavLink>
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
                <h3>Click to get started</h3>
              </div>
            </>
          }
        ></Route>
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
      {/* <CDBFooter className="shadow">
        <CDBBox
          display="flex"
          justifyContent="between"
          alignItems="center"
          className="mx-auto py-4 flex-wrap"
          style={{ width: "80%" }}
        >
          <CDBBox display="flex" alignItems="center">
            <a href="/" className="d-flex align-items-center p-0 text-dark">
              <img
                alt="logo"
                src="../assets/icon.png"
                width="30px"
              />
              <span className="ms-4 h5 mb-0 font-weight-bold">Quiz App</span>
            </a>
            <small className="ms-2">
              &copy; Quiz App, 2024. All rights reserved.
            </small>
          </CDBBox>
          <CDBBox display="flex">
            <CDBBtn flat color="dark" className="p-2">
              <CDBIcon fab icon="facebook-f" />
            </CDBBtn>
            <CDBBtn flat color="dark" className="mx-3 p-2">
              <CDBIcon fab icon="twitter" />
            </CDBBtn>
            <CDBBtn flat color="dark" className="p-2">
              <CDBIcon fab icon="instagram" />
            </CDBBtn>
          </CDBBox>
        </CDBBox>
      </CDBFooter> */}
    </Router>
  );
};

export default Navigation;
