import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import { useQuery } from "@tanstack/react-query";
import { queryClient } from "../../main";
import { useMutation } from "@tanstack/react-query";

// Components
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import CardWrapper from "../CardWrapper";
import Loading from "../Load";
import { Button } from "reactstrap";
import { TrashIcon } from "@radix-ui/react-icons";

const TestTable = () => {
  const token = localStorage.getItem("token");

  // Get all users
  const {
    isLoading,
    data: users,
    error,
    refetch,
  } = useQuery({
    queryKey: ["users"],
    queryFn: () =>
      fetch("https://two4-mintep1-app-dev.onrender.com/api/v1/users/all", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }).then((res) => res.json()),
      onSuccess: (data) => {
        console.log(JSON.parse(data));
      } 
  });

  // Delete users
  const { mutate: deleteUserMutation, data: updatedData } = useMutation({
    mutationFn: async ({ id }) => {
      const response = await fetch(`https://two4-mintep1-app-dev.onrender.com/api/v1/users/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (!response.ok) {
        throw new Error("Failed to delete user");
      }
      return response.json();
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries("users");
      refetch();
    },
    onError: (error) => {
      console.error("Delete mutation error:", error);
    },
  });

  const handleDelete = (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this item?"
    );
    if (confirmDelete) {
      try {
        deleteUserMutation.mutate({id});
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
                  <TableHead className="text-inherit py-2 px-4">
                    Options
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody className="text-gray-700 font-semibold">
                {error ? (
                  <TableRow>
                    <TableCell colSpan="3">{error.message}</TableCell>
                  </TableRow>
                ) : (
                  users.data.map((user) => (
                    <TableRow key={user.id}>
                      <TableCell>{user.id}</TableCell>
                      <TableCell>{user.email}</TableCell>
                      <TableCell>{user.username}</TableCell>
                      <TableCell>{user.firstName}</TableCell>
                      <TableCell>{user.lastName}</TableCell>
                      <TableCell>{user.role}</TableCell>
                      <TableCell>
                        <Button
                          className="bg-pink-500"
                          onClick={() => handleDelete(user.id)}
                        >
                          Delete
                        </Button>
                      </TableCell>
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
