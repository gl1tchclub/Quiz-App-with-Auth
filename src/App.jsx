import { useState } from "react";
// import "./App.css";
import "./index.css"
import { useForm } from "react-hook-form";
import { useQuery, useMutation } from "@tanstack/react-query";
import Navigation from "./components/Navigation";
import { useLocation } from "react-router-dom";


const App = () => {
  return (
    <>
      <Navigation/>
      <h1 className="text-3xl font-bold underline">Hello, world!</h1>
    </>
  );
};
const Layout = ({children}) => {
  const location = useLocation();

  //Define paths navbar should be displayed
  const navPaths = ['/','/quizzes','/users','/user'];

  return (
    <>
      {!navPaths.includes(location.pathname) && <Navbar />}
      <div className="content">
        {children}
      </div>
    </>
  )
}
export default App;
