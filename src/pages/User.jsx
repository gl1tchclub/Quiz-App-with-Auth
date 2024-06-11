import LogoutButton from "../components/buttons/LogoutButton";
import AlertComponent from "../components/Alert";
import { useLocation } from "react-router";
import React from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import NewUserTable from "../components/tables/NewUserTable";
import Loading from "../components/Load";

const UserPage = () => {
  // if (error) {
  //   return (
  //     <AlertComponent
  //       type="error"
  //       title="Error"
  //       desc={error? error.message : "Unauthorized. Please log in"}
  //       style="border-2 border-pink-700 w-1/3 bg-transparent shadow-xl mt-10 text-pink-800 [&>svg]:text-pink-800 [&>svg]:size-7"
  //     />
  //   );
  // }

  // if (isLoading) {
  //   return <Loading />;
  // }

  return (
    <>
      <div className="w-3/4 flex justify-center">
        <NewUserTable />
        {/* <AllUsersTable /> */}
      </div>
    </>
  );
};

export default UserPage;
