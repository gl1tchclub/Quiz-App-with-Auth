import NavigationMenuDemo from "./Nav";
import { useLocation } from "react-router";

const Layout = ({ children }) => {
  const location = useLocation();

  //Define paths navbar should be displayed on i.e. not login or register
  const navPaths = [
    "/quizzes",
    "/user",
    "/quizzes/old",
    "/quizzes/current",
    "/quizzes/new",
    "logout",
  ];

  return (
    <div className="flex flex-col min-h-screen bg-pink-50">
      {navPaths.includes(location.pathname) && <NavigationMenuDemo />}
      <div className="flex-grow">{children}</div>
    </div>
  );
};
export default Layout;
