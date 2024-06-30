/**
 * @file LogoutButton.jsx
 * @module LogoutButton
 * @description Button component for logging out the user, removes user data from localStorage and redirects to the home page.
 * @author Elizabeth Minty
 */

import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { ReloadIcon } from "@radix-ui/react-icons";
import { useState } from "react";

/**
 * LogoutButton component renders a button for logging out the user.
 * @returns {JSX.Element} Rendered component with logout button functionality.
 */
const LogoutButton = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

    /**
   * Handles the logout process.
   * Sets isLoading state to true, removes user data from localStorage,
   * then redirects to the home page after a delay.
   */
  const handleLogout = () => {
    setIsLoading(true);
    // Remove user data from localStorage
    localStorage.removeItem("token");
    localStorage.removeItem("userData");
    setTimeout(() => {
      setIsLoading(false);
      navigate("/");
    }, 1500);
    // Redirect to login page after logout
  };

  return (
    <Button className="bg-pink-500 hover:bg-pink-200 hover:text-pink-600" onClick={handleLogout}>
      {isLoading ? (
        <>
          <ReloadIcon className="mr-2 h-6 w-6 animate-spin" />
          <p className="mt-3 text-lg">Logging out...</p>
        </>
      ) : (
        <p className="mt-3 text-lg">Log Out</p>
      )}
    </Button>
  );
};
export default LogoutButton;
