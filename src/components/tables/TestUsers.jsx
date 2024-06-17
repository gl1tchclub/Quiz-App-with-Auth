import { useEffect, useState } from "react";
import { quizAppInstance } from "../../utils/axios";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
// Components
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Form,
  FormGroup,
  Label,
  Input,
  FormFeedback,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "reactstrap";
import { Button } from "@/components/ui/button";
import Loading from "../Load";
import CardWrapper from "../CardWrapper";
import { ErrorAlert } from "../Alert";

const UsersTable = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState([]);
  const updateForm = useForm();
  const navigate = useNavigate();
  const [errors, setErrors] = useState({
    username: "",
    firstName: "",
    lastName: "",
    role: "",
    submitError: "",
  });
  const [editItem, setEditItem] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    fetchData();
  }, [data]);

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const res = await quizAppInstance.get("/users/all");
      setData(res.data.data);
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this user?"
    );
    if (confirmDelete) {
      try {
        await quizAppInstance.delete(`/users/${id}`);
        setData(data.filter((user) => user.id !== id));
      } catch (err) {
        console.log(err);
      }
    }
  };

  const handleEdit = (user) => {
    setEditItem(user);
    setModalOpen(true);
  };

  const resetErrors = () => {
    setErrors({
      username: "",
      firstName: "",
      lastName: "",
      role: "",
      submitError: "",
    });
  };

  const handleEditFormSubmit = async (editedData) => {
    try {
      await quizAppInstance.put(`/users/${editUser.id}`, editedData);
      const updatedData = data.map(
        (
          user // Update the item in the data array
        ) => (user.id === editUser.id ? { ...user, ...editedData } : user)
      );
      resetErrors();
      setData(updatedData);
      setModalOpen(false);
      setEditItem(null);
      fetchData();
    } catch (err) {
      // Handle validation errors
      if (err.response && err.response.data && err.response.data.msg) {
        const errorMsg = err.response.data.error; // Get the error message
        const field = errorMsg.split(" ")[0]; // Get the field name from the error message, i.e., "name should be a string" -> "name"
        setErrors({
          ...errors, // Keep the other errors
          [field]: errorMsg, // Set the error for the field
        });
      } else {
        console.log(err);
      }
    }
  };

  const handleFormSubmit = () => fetchData();

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <>
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
                  {data.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan="5" className="text-center">
                        No data available
                      </TableCell>
                    </TableRow>
                  ) : (
                    <>
                      {data.map((user) => (
                        <TableRow
                          key={user.id}
                          className="border-b border-pink-200 hover:bg-transparent"
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
                          <TableCell className="py-2 px-4">
                            {user.role}
                          </TableCell>
                          <Button
                            color="primary"
                            onClick={() => handleEdit(item)}
                          >
                            Edit
                          </Button>{" "}
                          <Button
                            color="danger"
                            onClick={() => handleDelete(item.id)}
                          >
                            Delete
                          </Button>
                        </TableRow>
                      ))}
                    </>
                  )}
                </TableBody>
              </Table>
            </section>
          </CardWrapper>
          <Modal
            isOpen={modalOpen}
            toggle={() => {
              resetErrors(); // Reset errors when the modal is closed
              setModalOpen(!modalOpen);
            }}
          >
            <ModalHeader
              toggle={() => {
                resetErrors(); // Reset errors when the modal is closed
                setModalOpen(!modalOpen);
              }}
            >
              Edit User
            </ModalHeader>
            <ModalBody>
              <Form onSubmit={handleFormSubmit}>
                <FormGroup>
                  <Label for="editFirstname">First Name:</Label>
                  <Input
                    type="text"
                    defaultValue={editItem?.firstName}
                    id="editFirstname"
                    name="editFirstname"
                    invalid={!!errors.firstName}
                  />
                  <FormFeedback>{errors.firstName}</FormFeedback>
                </FormGroup>
                <FormGroup>
                  <Label for="editLastname">Last Name:</Label>
                  <Input
                    type="text"
                    defaultValue={editItem?.lastName}
                    id="editLastname"
                    name="editLastname"
                    invalid={!!errors.lastName}
                  />
                  <FormFeedback>{errors.lastName}</FormFeedback>
                </FormGroup>
                <FormGroup>
                  <Label for="editUsername">Username:</Label>
                  <Input
                    type="text"
                    defaultValue={editItem?.username}
                    id="editUsername"
                    name="editUsername"
                    invalid={!!errors.username}
                  />
                  <FormFeedback>{errors.username}</FormFeedback>
                </FormGroup>
                <FormGroup>
                  <Label for="editPassword">Password:</Label>
                  <Input
                    type="text"
                    defaultValue={editItem?.password}
                    id="editPassword"
                    name="editPassword"
                    invalid={!!errors.password}
                  />
                  <FormFeedback>{errors.password}</FormFeedback>
                </FormGroup>
                {errors.submitError && (
                  <div className="text-danger">{errors.submitError}</div>
                )}
              </Form>
            </ModalBody>
            <ModalFooter>
              <Button
                color="primary"
                type="submit"
                onClick={() =>
                  handleEditFormSubmit({
                    email: document.getElementById("editEmail").value,
                    firstName: document.getElementById("editFirstname").value,
                    lastName: document.getElementById("editLastname").value,
                    username: document.getElementById("editUsername").value,
                    password: document.getElementById("editPassword").value,
                  })
                }
              >
                Save
              </Button>
              <Button
                color="secondary"
                onClick={() => {
                  resetErrors();
                  setModalOpen(!modalOpen);
                }}
              >
                Cancel
              </Button>
            </ModalFooter>
          </Modal>
        </>
      )}
    </>
  );
};

export default UsersTable;
