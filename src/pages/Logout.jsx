import LogoutButton from "../components/buttons/LogoutButton";
import React from "react";
import CardWrapper from "../components/CardWrapper";

const LogoutPage = () => {

  return (
    <div className="w-full h-dvh flex items-center justify-center">
      <CardWrapper
        title="Do you wish to log out?"
        label="We'll see you soon!"
        box="justify-center items-center align-center w-1/2 mx-auto bg-pink-300 shadow-lg rounded-lg p-6 mb-40"
      >
        
        <LogoutButton />

      </CardWrapper>
    </div>
  
  )
};
export default LogoutPage;