import LogoutButton from "../components/buttons/LogoutButton";

const UserPage = () => {
  console.log(localStorage.getItem("token"));
  return (
    <>
      {/* <LogoutButton /> */}
      {localStorage.getItem("token") ? <LogoutButton /> : null}
    </>
  );
};

export default UserPage;
