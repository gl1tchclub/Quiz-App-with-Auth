import Navbar from "./Nav";
import { useLocation } from "react-router";

const Layout = ({ children }) => {
  const location = useLocation();

  //Define paths navbar should be displayed on i.e. not login or register
  const navPaths = ["/", "/quizzes", "/users", "/user", "/info"];

  return (
    <div className="flex flex-col min-h-screen bg-pink-100">
      {navPaths.includes(location.pathname) && <Navbar />}
      <div className="flex-grow">{children}</div>
    </div>
  );
};
export default Layout;
