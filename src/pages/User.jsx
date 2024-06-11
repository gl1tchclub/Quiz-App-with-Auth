import LogoutButton from "../components/buttons/LogoutButton";
import AlertComponent from "../components/Alert";
import { useLocation } from "react-router";
import React from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import UserTable from "../components/tables/UserTable";
import AllUsersTable from "../components/tables/AllUsersTable";

const UserPage = () => {
  const role = localStorage.getItem("userData").role;

  return (
    <>
      <div className="w-3/4 flex justify-center">
        {role === "ADMIN_USER" ? (
          <>
            <UserTable />
            <AllUsersTable />
          </>
        ) : (
          <UserTable />
        )}
      </div>
    </>
  );
};

export default UserPage;
