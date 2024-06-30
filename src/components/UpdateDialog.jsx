/**
 * @file UpdateDialog.jsx
 * @module components/UpdateDialog
 * @description Component for displaying a dialog to edit user details.
 * @author Elizabeth Minty
 */

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

import { useState, useEffect } from "react";

/**
 * Component for displaying a dialog to edit user details.
 * @param {Object} props - Component props containing isOpen, onClose, user, and onUpdate.
 * @returns {JSX.Element} Rendered UpdateDialog.
 */
const UpdateDialog = ({ isOpen, onClose, user, onUpdate }) => {
  const [editedUser, setEditedUser] = useState({
    id: user.id,
    email: user.email,
    username: user.username,
    firstName: user.firstName,
    lastName: user.lastName,
    role: user.role,
  });

  // Reset editedUser when dialog opens or user changes
  useEffect(() => {
    if (isOpen && user) {
      setEditedUser({
        email: "",
        username: "",
        firstName: "",
        lastName: "",
        role: "",
      });
    }
  }, [isOpen, user]);

  // Handle input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdate(editedUser); // Call parent onUpdate function with edited user data
    console.log(editedUser);
    onClose(); // Close dialog after submission
  };

  return (
    <Dialog isOpen={isOpen} onClose={onClose} >
      <DialogTrigger asChild>
        <Button className="bg-pink-500 text-white hover:bg-pink-400 my-2">Edit</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit User</DialogTitle>
          <DialogDescription>
            Make changes to user details here. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="email" className="text-right">
                Email
              </Label>
              <Input
                id="email"
                name="email"
                value={editedUser.email}
                onChange={handleInputChange}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="username" className="text-right">
                Username
              </Label>
              <Input
                id="username"
                name="username"
                value={editedUser.username}
                onChange={handleInputChange}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="firstName" className="text-right">
                First Name
              </Label>
              <Input
                id="firstName"
                name="firstName"
                value={editedUser.firstName}
                onChange={handleInputChange}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="lastName" className="text-right">
                Last Name
              </Label>
              <Input
                id="lastName"
                name="lastName"
                value={editedUser.lastName}
                onChange={handleInputChange}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="role" className="text-right">
                Password
              </Label>
              <Input
                id="role"
                name="role"
                value={editedUser.role}
                onChange={handleInputChange}
                className="col-span-3"
              />
            </div>
          </div>
          <DialogFooter className="justify-center">
            <Button type="submit" className="bg-pink-500 text-white hover:bg-pink-400">Save Changes</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default UpdateDialog;
