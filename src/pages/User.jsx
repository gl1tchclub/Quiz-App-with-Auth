import { ErrorAlert } from "../components/Alert";
import React from "react";
import UserTable from "../components/tables/UserTable";
import UsersTable from "../components/tables/UsersTable";

const UserPage = () => {
  let role = JSON.parse(localStorage.getItem("userData")) ? JSON.parse(localStorage.getItem("userData")).role : undefined;

  return (
    <>
      {role ? (
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
        <ErrorAlert desc="Unauthorized. Please log in"/>
      )}
    </>
  );
};

export default UserPage;
