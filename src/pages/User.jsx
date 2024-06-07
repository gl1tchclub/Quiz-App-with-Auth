import LogoutButton from "../components/buttons/LogoutButton";
import AllUsersTable from "../components/tables/AllUsersTable";
import UserTable from "../components/tables/UserTable";
import AlertComponent from "../components/Alert";
import { useLocation } from "react-router";
import { useAuth } from "../components/contexts/AuthContext";

const UserPage = () => {
  const { user } = useAuth();
  console.log(user);

  return (
    <>
      {user ? (
        <div>
          <LogoutButton /> 
          <UserTable />
          <AllUsersTable />
        </div>
      ) : 
        <AlertComponent
          type="error"
          title="Error"
          desc="Unauthorized. Please log in"
          style="border-2 border-pink-700 w-1/3 bg-transparent shadow-xl mt-10 text-pink-800 [&>svg]:text-pink-800 [&>svg]:size-7"
        />}
    </>
  );
};

const Layout = ({ children }) => {
  const location = useLocation();

  if (user) {

  }
  //Define paths navbar should be displayed on i.e. not login or register
  const navPaths = ["/", "/quizzes", "/users", "/user", "/info"];

  return (
    <div className="flex flex-col min-h-screen bg-pink-100">
      {navPaths.includes(location.pathname) && <Navbar />}
      <div className="flex-grow">{children}</div>
    </div>
  );
}

export default UserPage;
