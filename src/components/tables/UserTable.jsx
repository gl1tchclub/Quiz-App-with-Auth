/**
 * @file UserTable.jsx
 * @module components/UserTable
 * @description Displays user information in a table and allows for user details update.
 * @author Elizabeth Minty
 */

import { useState } from "react";
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
import { ErrorAlert } from "../Alert";
import CardWrapper from "../CardWrapper";
import UpdateDialog from "../UpdateDialog";

/**
 * Functional component for rendering a table displaying user information.
 * Handles rendering of user data and provides update functionality through a dialog.
 * @returns {JSX.Element} Rendered UserTable component.
 */
const UserTable = () => {
  let user = JSON.parse(localStorage.getItem("userData"));

  // State for dialog
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  // Toggle dialog
  const toggleDialog = () => {
    setIsDialogOpen(!isDialogOpen);
  };

  /**
   * Updates user details using an API call.
   * Invalidates and refetches user data upon successful update.
   * @param {Object} updatedUser - Updated user object containing new details.
   */
  const updateUser = async (updatedUser) => {
    try {
      // Perform update operation (e.g., API call)
      const response = await fetch(
        `https://two4-mintep1-app-dev.onrender.com/api/v1/users/${updatedUser.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify(updatedUser),
        },
      );
      if (!response.ok) {
        throw new Error("Failed to update user");
      }
      const data = await response.json();
      localStorage.setItem("userData", JSON.stringify(data.data));
      user = JSON.parse(localStorage.getItem("userData"));
      // refetch();

      // Invalidate and refetch users list
      queryClient.invalidateQueries("users");
    } catch (error) {
      console.error("Update user error:", error);
    }
  };

  if (!user) {
    return <ErrorAlert desc="Unauthorized. Please log in" />;
  }

  return (
    <>
      <CardWrapper
        title="Dashboard"
        box="w-fit mx-auto bg-pink-300 shadow-lg rounded-lg p-6 mt-20"
        label="Your user information"
      >
        <section className="text-pink-700 bg-pink-200 rounded-lg p-6 shadow-md">
          <div className="flex justify-center pb-2">
            <img src={user.avatar} className="w-15 h-24" />
          </div>
          <Table className="hover:none">
            <TableHeader className="text-lg text-pink-700 ">
              <TableRow className="border-b-2 border-pink-300 hover:bg-transparent">
                <TableHead className="text-inherit py-2 px-4">ID</TableHead>
                <TableHead className="text-inherit py-2 px-4">Email</TableHead>
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
        <div className="flex justify-center">
          <UpdateDialog
            isOpen={isDialogOpen}
            onClose={toggleDialog}
            user={user}
            onUpdate={updateUser}
          />
        </div>
      </CardWrapper>
      {/* )} */}
    </>
  );
};

export default UserTable;
