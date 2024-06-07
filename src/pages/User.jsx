import LogoutButton from "../components/buttons/LogoutButton";
import AllUsersTable from "../components/tables/AllUsersTable";
import AlertComponent from "../components/Alert";
import { useLocation } from "react-router";
import { useAuth } from "../components/contexts/AuthContext";
import React from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import NewUserTable from "../components/tables/NewUserTable";
import Loading from "../components/Load";

const UserPage = () => {
  const fetchUser = async (userId) => {
    const { data } = await axios.get(
      `https://two4-mintep1-app-dev.onrender.com/api/v1/users/${userId}`
    );
    return data;
  };

  const { userId } = useAuth();

  const {
    data: user,
    error,
    isLoading,
  } = useQuery(["user", userId], () => fetchUser(userId), {
    enabled: !!userId,
  });

  console.log(user);

  if (!userId || error) {
    return (
      <AlertComponent
        type="error"
        title="Error"
        desc={error? error.message : "Unauthorized. Please log in"}
        style="border-2 border-pink-700 w-1/3 bg-transparent shadow-xl mt-10 text-pink-800 [&>svg]:text-pink-800 [&>svg]:size-7"
      />
    );
  }

  if (isLoading) {
    return <Loading />;
  }

  return (
    <>
      <div>
        <LogoutButton />
        <NewUserTable user={user}/>
        <AllUsersTable />
      </div>
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
};

export default UserPage;
