import { useState } from "react";
// import "./App.css";
import "./index.css"
import { useForm } from "react-hook-form";
import { useQuery, useMutation } from "@tanstack/react-query";
import Navigation from "./components/Navigation";


const App = () => {
  return (
    <>
      <Navigation/>
      <h1 className="text-3xl font-bold underline">Hello, world!</h1>
    </>
  );
};

export default App;
