import { queryClient } from "./main";
import { useQuery, useMutation } from "@tanstack/react-query";
import { Button, UncontrolledAlert } from "reactstrap";

const Logout = () => {
  //handleLogout needed?
  return (
    <Button
      color="danger"
      onClick={() => {
        localStorage.removeItem("token");
      }}
    >
      Logout
    </Button>
  );
};
export default Logout;
