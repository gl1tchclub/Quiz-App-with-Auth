// src/components/UserTable.jsx
import React from "react";
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
                {Object.keys(user).map((key) => (
                  <TableRow key={user}>
                    <TableCell>{user.id}</TableCell>
                    <TableCell>{user[key]}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
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
