/**
 * @file User.jsx
 * @module User
 * @description Page component for rendering user tables based on user role.
 * @author Elizabeth Minty
 */

import { ErrorAlert } from "../components/Alert";
import React from "react";
import UserTable from "../components/tables/UserTable";
import UsersTable from "../components/tables/UsersTable";

/**
 * UserPage component renders different user tables based on the user's role.
 * If the user is authenticated and authorized (admin), both UserTable and UsersTable are rendered.
 * If the user is authenticated but not an admin, only UserTable is rendered.
 * If there's an authentication error (error flag set in localStorage), an ErrorAlert is rendered.
 * @returns {JSX.Element} Rendered component displaying user tables or error alert.
 */
const UserPage = () => {
  let role = JSON.parse(localStorage.getItem("userData"))
    ? JSON.parse(localStorage.getItem("userData")).role
    : undefined;

  return (
    <>
      {/* Conditional rendering based on authentication and user role */}
      {localStorage.getItem("error") != "true" ? (
        <div className="w-3/4 flex justify-center">
          {role === "ADMIN_USER" ? (
            <>
              <div className="w-full justify-center flex-col">
                <UserTable />
                <UsersTable />
              </div>
            </>
          ) : (
            <UserTable />
          )}
        </div>
      ) : (
        <ErrorAlert desc="Unauthorized. Please log in" />
      )}
    </>
  );
};

export default UserPage;
