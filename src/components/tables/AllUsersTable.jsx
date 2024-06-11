import { useQuery, useInfiniteQuery } from "@tanstack/react-query";
import { queryClient } from "../../main";

// Components
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import Loading from "../Load";

const AllUsersTable = () => {
  const user = JSON.parse(localStorage.getItem("userData"));
  const token = localStorage.getItem("token");

  const { isLoading, data: users } = useQuery({
    queryKey: ["users"],
    queryFn: () =>
      fetch("https://two4-mintep1-app-dev.onrender.com/api/v1/users", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }).then((res) => {console.log(res.json()); return res.json()}),
    onSuccess: (data) => {
      console.log(data);
      // queryClient.invalidateQueries("users");
    },
  });

  console.log(user);

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Username</TableHead>
              <TableHead>First Name</TableHead>
              <TableHead>Last Name</TableHead>
              <TableHead>Role</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users.data.map((user) => (
              <TableRow key={user.id}>
                <TableCell>{user.id}</TableCell>
                <TableCell>{user.username}</TableCell>
                <TableCell>{user.firstName}</TableCell>
                <TableCell>{user.lastName}</TableCell>
                <TableCell>{user.role}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </>
  );
};

export default AllUsersTable;
