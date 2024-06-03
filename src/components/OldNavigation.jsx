// Packages
import { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";

// Components
import Navbar from "./Nav";

// Forms
import Test from "./forms/RegisterForm";
import RegisterForm from "./forms/OldRegisterForm";
import LoginForm from "./forms/LoginForm";

// Pages
import HomePage from "../pages/Home";

const Navigation = () => {
  return (
    <Router>
      <Navbar />
      <section className="container mx-auto h-screen">
        <div className=" flex items-center justify-center">
          <Routes>
            <Route path="/" element={<HomePage />}></Route>
            <Route
              path="/oldreg"
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
                  <div
                    style={{ display: "flex", justifyContent: "center" }}
                  ></div>
                </>
              }
            />
            <Route
              path="/register"
              element={
                <>
                  <Test />
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
