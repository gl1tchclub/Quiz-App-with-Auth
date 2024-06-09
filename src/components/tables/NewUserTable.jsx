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
import CardWrapper from "../CardWrapper";

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
            <CardWrapper
              title="Dashboard"
              style="w-3/4 mx-auto bg-pink-300 shadow-lg rounded-lg p-6"
            >
              <section className="text-pink-700 bg-pink-200 rounded-lg p-6 shadow-md">
                <Table>
                  <TableHeader className="text-lg text-pink-700">
                    <TableRow className="border-b-2 border-pink-300">
                      <TableHead className="text-inherit py-2 px-4">
                        ID
                      </TableHead>
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
                  <TableBody className="text-pink-600">
                    <TableRow
                      key={user.id}
                      className="border-b border-pink-200 hover:bg-pink-50"
                    >
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
                  </TableBody>
                </Table>
              </section>
            </CardWrapper>
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
