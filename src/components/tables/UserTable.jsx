// src/components/UserTable.jsx
import React from "react";

// Components
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ErrorAlert } from "../Alert";
import CardWrapper from "../CardWrapper";

const UserTable = () => {
  const user = JSON.parse(localStorage.getItem("userData"));

  if (!user) {
    return <ErrorAlert desc="Unauthorized. Please log in" />;
  }

  // create isLoading func

  return (
    <>
      {/* {isLoading ? (
        <Loading />
      ) : ( */}
      <CardWrapper
        title="Dashboard"
        box="w-fit mx-auto bg-pink-300 shadow-lg rounded-lg p-6 mt-20"
        button="true"
        buttonLabel="Update Info"
        href="/user/update"
        label="Your user information"
        buttonStyle="bg-pink-500 text-pink-100 font-bold py-2 px-4 rounded hover:bg-pink-400"
      >
        <section className="text-pink-700 bg-pink-200 rounded-lg p-6 shadow-md">
          <div className="flex justify-center pb-2">
              <img src={user.avatar} className="w-15 h-24" />
          </div>
          <Table className="hover:none">
            <TableHeader className="text-lg text-pink-700 ">
              <TableRow className="border-b-2 border-pink-300 hover:bg-transparent">
                <TableHead className="text-inherit py-2 px-4">ID</TableHead>
                <TableHead className="text-inherit py-2 px-4">
                  Email
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
                <TableHead className="text-inherit py-2 px-4">Role</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody className="text-gray-700 font-semibold">
              <TableRow
                key={user.id}
                className="border-b border-pink-200 hover:bg-transparent"
              >
                <TableCell className="py-2 px-4">{user.id}</TableCell>
                <TableCell className="py-2 px-4">{user.email}</TableCell>
                <TableCell className="py-2 px-4">{user.username}</TableCell>
                <TableCell className="py-2 px-4">{user.firstName}</TableCell>
                <TableCell className="py-2 px-4">{user.lastName}</TableCell>
                <TableCell className="py-2 px-4">{user.role}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </section>
      </CardWrapper>
      {/* )} */}
    </>
  );
};

export default UserTable;
