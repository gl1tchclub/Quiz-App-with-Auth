import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const LogoutButton = () => {
  const navigate = useNavigate();
  return (
    <Button
      className="bg-pink-500 hover:bg-pink-300 hover:text-pink-600"
      onClick={() => {
        localStorage.removeItem("token");
        localStorage.removeItem("userData");
        navigate("/");
      }}
    >
      Logout
    </Button>
  );
};
export default LogoutButton;
