import { Button } from "@/components/ui/button";

const Logout = () => {
  return (
    <Button
      className="bg-pink-500 hover:bg-pink-300 hover:text-pink-600"
      onClick={() => {
        localStorage.removeItem("token");
      }}
      href="/login"
    >
      Logout
    </Button>
  );
};
export default Logout;
