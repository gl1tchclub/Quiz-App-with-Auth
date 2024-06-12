import LogoutButton from "../components/buttons/LogoutButton";
import { ErrorAlert } from "../components/Alert";
import { useLocation } from "react-router";
import React from "react";
import { useQuery } from "@tanstack/react-query";
import UserTable from "../components/tables/UserTable";
import AllUsersTable from "../components/tables/AllUsersTable";

const UserPage = () => {
  const role = JSON.parse(localStorage.getItem("userData")).role;

  return (
    <>
      {role ? (
        <div className="w-3/4 flex justify-center">
          {/* <AllUsersTable /> */}
          {role === "ADMIN_USER" ? (
            <>
              <UserTable />
              <AllUsersTable />
            </>
          ) : (
            <UserTable />
          )}
        </div>
      ) : (
        <ErrorAlert desc="Unauthorized. Please log in"/>
        // <div>hi</div>
      )}
    </>
  );
};

export default UserPage;
