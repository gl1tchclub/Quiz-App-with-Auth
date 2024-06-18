import { useEffect, useState } from "react";
import { quizAppInstance } from "../../utils/axios";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import { useQuery } from "@tanstack/react-query";
import { queryClient } from "../../main";

// Components
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Loading from "../Load";

const TestTable = () => {
  const token = localStorage.getItem("token");
  const { isLoading, data: users } = useQuery({
    queryKey: ["users"],
    queryFn: () =>
      fetch("https://two4-mintep1-app-dev.onrender.com/api/v1/users/all", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }).then((res) => res.json()),
  });

  const { mutate: deleteUserMutation, data: updatedUsers } = useMutation(
    async () => {
      mutationFn: (user) =>
        fetch(
          `https://two4-mintep1-app-dev.onrender.com/api/v1/user/${user.id}`,
          {
            method: DELETE,
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries("users");
      },
    }
  );

  const handleDelete = async (item) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this item?"
    );
    if (confirmDelete) {
      try {
        deleteItemMutation(`/users/${id}`);
        setData(data.filter((item) => item.id !== id)); // Remove the item from the data array
      } catch (err) {
        console.log(err);
      }
    }
  };

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <CardWrapper
          title="Dashboard"
          box="w-3/4 mx-auto bg-pink-300 shadow-lg rounded-lg p-6 mt-20"
          label="Your user information"
        >
          <section className="text-pink-700 bg-pink-200 rounded-lg p-6 shadow-md">
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
                {users.error ? (
                  <TableRow>
                    <TableCell colSpan="3">{users.error}</TableCell>
                  </TableRow>
                ) : (
                  users.data.map((user) => (
                    <TableRow key={user.id}>
                      <TableCell>{user.email}</TableCell>
                      <TableCell>{user.username}</TableCell>
                      <TableCell>{user.firstName}</TableCell>
                      <TableCell>{user.lastName}</TableCell>
                      <TableCell>{user.role}</TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </section>
        </CardWrapper>
      )}
    </>
  );
};

export default TestTable;
