// src/components/UserTable.jsx
import React from "react";
import { useQuery, useInfiniteQuery } from "@tanstack/react-query";
import UpdateForm from "../forms/UpdateUserForm";

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

const NewUserTable = () => {
  const user = JSON.parse(localStorage.getItem("userData"));

  if (!user) {
    return (
      <AlertComponent
        type="error"
        title="Error"
        desc="Unauthorized. Please log in"
        style="border-2 border-pink-700 w-1/3 bg-transparent shadow-xl mt-10 text-pink-800 [&>svg]:text-pink-800 [&>svg]:size-7"
      />
    );
  }

  const { isLoading, data: userData } = useQuery({
    queryKey: ["userData"],
    queryFn: () =>
      fetch(
        `https://two4-mintep1-app-dev.onrender.com/api/v1/users/${user.id}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      ).then((res) => res.json()),
  });

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <>
          {userData?.error || !userData ? (
            <AlertComponent
              type="error"
              title="Error"
              desc={message}
              style="border-2 border-pink-700 w-1/3 bg-transparent shadow-xl mt-10 text-pink-800 [&>svg]:text-pink-800 [&>svg]:size-7"
            />
          ) : (
            <section className="text-pink-500 bg-pink-200 rounded-lg">
            <Table>
              <TableHeader className="text-lg text-pink-600 ">
                <TableRow>
                  <TableHead className="text-inherit">ID</TableHead>
                  <TableHead className="text-inherit">Username</TableHead>
                  <TableHead className="text-inherit">First Name</TableHead>
                  <TableHead className="text-inherit">Last Name</TableHead>
                  <TableHead className="text-inherit">Role</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody >
                <TableRow>
                  <TableCell>{user.id}</TableCell>
                  <TableCell>{user.username}</TableCell>
                  <TableCell>{user.firstName}</TableCell>
                  <TableCell>{user.lastName}</TableCell>
                  <TableCell>{user.role}</TableCell>
                </TableRow>
              </TableBody>
            </Table>
            </section>
          )}
        </>
      )}

      {/* {hasNextPage && (
      <Button onClick={() => fetchNextPage()}>
        {isFetchingNextPage ? <Loading /> : "Load More"}
      </Button>
    )} */}
    </>
  );
};

export default NewUserTable;
