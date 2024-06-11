import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { ReloadIcon } from "@radix-ui/react-icons";
import { useState } from "react";

const LogoutButton = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

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
    <Button className="bg-pink-500 hover:bg-pink-200 hover:text-pink-600">
      {isLoading ? (
        <>
          <ReloadIcon className="mr-2 h-6 w-6 animate-spin" />
          <p className="mt-3 text-lg">Loggin out...</p>
        </>
      ) : (
        <p className="mt-3 text-lg">Log Out</p>
      )}
    </Button>
  );
};
export default LogoutButton;
