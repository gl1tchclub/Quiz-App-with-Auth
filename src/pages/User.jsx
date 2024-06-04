import LogoutButton from "../components/buttons/LogoutButton";
import AllUsersTable from "../components/tables/AllUsersTable";
import AlertComponent from "../components/Alert";

const UserPage = () => {
  const user = localStorage.getItem("token") || null;
  return (
    <>
      {user ? (
        <div>
          <LogoutButton /> 
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

export default UserPage;
