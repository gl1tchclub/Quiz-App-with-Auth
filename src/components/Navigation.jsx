import { useState } from "react";

import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import Navbar from "./Nav";
import Test from "./forms/TestForm";
import RegisterForm from "./forms/RegisterForm";
import LoginForm from "./forms/LoginForm";


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
              path="/register"
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
