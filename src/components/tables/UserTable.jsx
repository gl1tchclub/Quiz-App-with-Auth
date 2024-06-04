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
import AlertComponent from "../Alert";

const UserTable = () => {
  const { isLoading, data: userData } = useQuery({
    queryKey: ["userData"],
    queryFn: () =>
      fetch("https://two4-mintep1-app-dev.onrender.com/api/v1/users", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }).then((res) => res.json()),
  });

  //   const {
  //     isLoading,
  //     data: userData,
  //     isFetchingNextPage,
  //     hasNextPage,
  //     fetchNextPage,
  //   } = useInfiniteQuery({
  //     queryKey: ["userData"],
  //     queryFn: ({ page = 1 }) =>
  //       fetch(
  //         `https://two4-mintep1-app-dev.onrender.com/api/v1/users?page=${page}&pageSize=5`
  //       ).then((res) => res.json()),
  //     getNextPageParam: (prevData) => prevData.nextPage,
  //   });
  let message = userData ? userData.error : "Fetch Failed";

  return (
    <>
      {/* {isLoading ? (
        <Loading />
      ) : ( */}

      {userData?.error || !userData ? (
        <AlertComponent
          type="error"
          title="Error"
          desc={message}
          style="border-2 border-pink-700 w-1/3 bg-transparent shadow-xl mt-10 text-pink-800 [&>svg]:text-pink-800 [&>svg]:size-7"
        />
      ) : (
        //   ) : (
        //     <Table>
        //       <TableHeader>
        //         <TableRow>
        //           <TableHead>ID</TableHead>
        //           <TableHead>Username</TableHead>
        //           <TableHead>First Name</TableHead>
        //           <TableHead>Last Name</TableHead>
        //           <TableHead>Role</TableHead>
        //         </TableRow>
        //       </TableHeader>
        //       <TableBody>
        //         {userData.map((user) => (
        //           <TableRow key={user.id}>
        //             <TableCell>{user.id}</TableCell>
        //             <TableCell>{user.username}</TableCell>
        //             <TableCell>{user.firstName}</TableCell>
        //             <TableCell>{user.lastName}</TableCell>
        //             <TableCell>{user.role}</TableCell>
        //           </TableRow>
        //         ))}
        //       </TableBody>
        //     </Table>
        <p>
          <AlertComponent
            type="success"
            title="Success"
            desc="Fetch Success"
            style="border-2 border-black w-1/3 bg-transparent shadow-xl mt-10 text-black [&>svg]:text-black [&>svg]:size-7"
          />
        </p>
      )}

      {/* )} */}
      {/* {hasNextPage && (
        <Button onClick={() => fetchNextPage()}>
          {isFetchingNextPage ? <Loading /> : "Load More"}
        </Button>
      )} */}
    </>
  );
};

export default UserTable;
