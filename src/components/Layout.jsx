/**
 * @file Layout.jsx
 * @module Layout
 * @description Layout component for the Mintep1 Quiz App.
 * Renders a layout with conditional navigation based on current route.
 * @author Elizabeth Minty
 */

import Nav from "./Nav";
import { useLocation } from "react-router";

/**
 * Layout component for the Mintep1 Quiz App.
 * Renders a layout with conditional navigation based on current route.
 * @param {object} props - React props containing `children` elements
 * @returns {JSX.Element} Layout component JSX
 */
const Layout = ({ children }) => {
  const location = useLocation();

  //Define paths navbar should be displayed on
  const navPaths = [
    "/quizzes",
    "/user",
    "/quizzes/old",
    "/quizzes/current",
    "/quizzes/new",
    "/logout",
    "/quiz"
  ];

  return (
    <div className="flex flex-col min-h-screen bg-pink-50">
      {/* Conditionally render Nav component based on current path */}
      {navPaths.includes(location.pathname) && <Nav />}
      <div className="flex-grow">{children}</div>
    </div>
  );
};
export default Layout;
