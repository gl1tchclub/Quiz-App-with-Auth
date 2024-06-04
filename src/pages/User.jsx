import LogoutButton from "../components/buttons/LogoutButton";
import UserTable from "../components/tables/UserTable";

const UserPage = () => {
  console.log(localStorage.getItem("token"));
  return (
    <>
      {/* <LogoutButton /> */}
      {localStorage.getItem("token") ? <LogoutButton /> : null}
      <UserTable/>
    </>
  );
};

export default UserPage;
