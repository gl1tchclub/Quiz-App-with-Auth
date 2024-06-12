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
import { ErrorAlert } from "../Alert";

const AllUsersTable = () => {
  const user = JSON.parse(localStorage.getItem("userData"));
  const token = localStorage.getItem("token");

  // const { isLoading, error, data: users } = useQuery({
  //   queryKey: ["users"],
  //   queryFn: () =>
  //     fetch(`https://two4-mintep1-app-dev.onrender.com/api/v1/users?page=1`, {
  //       headers: {
  //         Authorization: `Bearer ${token}`,
  //       },
  //     }).then((res) => {
  //       console.log(res.json());
  //       return res.json();
  //     }),
  //   onSuccess: (data) => {
  //     console.log(data);
  //     // queryClient.invalidateQueries("users");
  //   },
  // });

  const {
    isLoading,
    data: users,
    error,
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
  } = useInfiniteQuery({
    queryKey: ["users"],
    queryFn: ({ pageParam = 1 }) =>
      fetch(
        `https://two4-mintep1-app-dev.onrender.com/api/v1/users?page=${pageParam}`
      ).then((res) => {console.log(res.json()); res.json()}),
    getNextPageParam: (prevData, allPages) => prevData.nextPage,
  });

  if (error) return <ErrorAlert desc="Unable to fetch all users." />;

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <div
          className="overflow-x-auto"
          onScroll={(e) => {
            if (
              e.target.scrollHeight - e.target.scrollTop ===
              e.target.clientHeight
            ) {
              fetchNextPage();
            }
          }}
        >
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
          {isFetchingNextPage && <Spinner className="m-auto" />}
          {!hasNextPage && <div>No more users to load</div>}
        </div>
      )}
    </>
  );
};

export default AllUsersTable;
