import LogoutButton from "../components/buttons/LogoutButton";
import UserTable from "../components/tables/UserTable";

const UserPage = () => {
  let user = localStorage.getItem("token") || null;
  return (
    <>
      {/* <LogoutButton /> */}
      {user ? (
        <div>
          <LogoutButton /> <UserTable />
        </div>
      ) : null}
      <UserTable />
    </>
  );
};

export default UserPage;
