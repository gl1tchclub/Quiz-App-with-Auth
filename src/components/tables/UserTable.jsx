import { useQuery, useInfiniteQuery } from "@tanstack/react-query";

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
import AlertComponent from "../Alert";

const UserTable = () => {
  //   const { isLoading, data: userData } = useQuery({
  //     queryKey: ["userData"],
  //     queryFn: () =>
  //       fetch("http://localhost:3000/api/v1/users", {
  //         headers: {
  //           Authorization: `Bearer ${localStorage.getItem("token")}`,
  //         },
  //       }).then((res) => res.json()),
  //   });

  const {
    isLoading,
    data: userData,
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
  } = useInfiniteQuery({
    queryKey: ["userData"],
    queryFn: ({ page = 1 }) =>
      fetch(
        `https://two4-mintep1-app-dev.onrender.com/api/v1/users?page=${page}&pageSize=5`
      ).then((res) => res.json()),
    getNextPageParam: (prevData) => prevData.nextPage,
  });

  if (isLoading) {
    return "Loading...";
  }

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <>
          {userData.pages[0].msg ? (
            <AlertComponent
              type="error"
              title="Error"
              desc={userData.pages[0].msg}
              style="border-2 border-pink-700 w-1/3 bg-transparent shadow-xl mt-10 text-pink-800 [&>svg]:text-pink-800 [&>svg]:size-7"
            />
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
                {userData.pages
                  .flatmap((data) => data.data)
                  .map((user) => (
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
      )}
      {hasNextPage && (
        <Button onClick={() => fetchNextPage()}>
          {isFetchingNextPage ? <Loading /> : "Load More"}
        </Button>
      )}
    </>
  );
};

export default UserTable;
