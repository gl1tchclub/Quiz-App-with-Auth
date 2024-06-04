import LogoutButton from "../components/LogoutButton";

const UserPage = () => {
  console.log(localStorage.getItem("token"));
  return (
    <>
      <LogoutButton />
    </>
  );
  // {localStorage.getItem("token") ? <Logout /> : null}
};

export default UserPage;
