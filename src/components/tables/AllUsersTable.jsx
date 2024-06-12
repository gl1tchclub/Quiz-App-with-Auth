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
      ).then((res) => {
        console.log(res.json());
        res.json();
      }),
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
          <CardWrapper
            title="Dashboard"
            box="w-3/4 mx-auto bg-pink-300 shadow-lg rounded-lg p-6 mt-20"
            // button="true"
            // buttonLabel="Update Info"
            // href="/user/update"
            label="All Users"
            buttonStyle="bg-pink-700 text-pink-100 font-bold py-2 px-4 rounded hover:bg-pink-800"
          >
            <section className="text-pink-700 bg-pink-200 rounded-lg p-6 shadow-md">
              <Table className="hover:none">
                <TableHeader className="text-lg text-pink-700">
                  <TableRow className="border-b-2 border-pink-300 hover:bg-transparent">
                    <TableHead className="text-inherit py-2 px-4">ID</TableHead>
                    <TableHead className="text-inherit py-2 px-4">
                      Username
                    </TableHead>
                    <TableHead className="text-inherit py-2 px-4">
                      First Name
                    </TableHead>
                    <TableHead className="text-inherit py-2 px-4">
                      Last Name
                    </TableHead>
                    <TableHead className="text-inherit py-2 px-4">
                      Role
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody className="text-gray-700 font-semibold">
                  {users.data.map((user) => (
                    <TableRow key={user.id}>
                      <TableCell className="py-2 px-4">{user.id}</TableCell>
                      <TableCell className="py-2 px-4">
                        {user.username}
                      </TableCell>
                      <TableCell className="py-2 px-4">
                        {user.firstName}
                      </TableCell>
                      <TableCell className="py-2 px-4">
                        {user.lastName}
                      </TableCell>
                      <TableCell className="py-2 px-4">{user.role}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              {isFetchingNextPage && <Spinner className="m-auto" />}
              {!hasNextPage && <div>No more users to load</div>}
            </section>
          </CardWrapper>
        </div>
      )}
    </>
  );
};

export default AllUsersTable;
