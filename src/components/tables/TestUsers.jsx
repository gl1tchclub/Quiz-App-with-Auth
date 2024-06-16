import { useEffect, useState } from "react";
import { quizAppInstance } from "../../utils/axios";

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
            const { mutate: postUpdateMutation, data: updateData } = useMutation({
                mutationFn: (user) =>
                    fetch(`https://two4-mintep1-app-dev.onrender.com/api/v1/user/${props.id}`, {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify({
                            email: user.email,
                            username: user.username,
                            firstName: user.firstName,
                            lastName: user.lastName,
                            password: user.password,
                            confirm_password: user.confirm_password,
                        }),
                    }).then((res) => {
                        if (res.status === 201) {
                            updateForm.reset((formValues) => ({
                                ...formValues,
                                email: "",
                                username: "",
                                firstName: "",
                                lastName: "",
                                password: "",
                                confirm_password: "",
                            }));
                        }
                        return res.json();
                    }),
                onSuccess: (data) => {
                    localStorage.setItem("userData", JSON.stringify(data.data));
                    console.log(JSON.parse(localStorage.getItem("userData")));
                    if (data.token) navigate("/user");
                },
            });
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
            const updatedData = data.map((user) => // Update the item in the data array
                user.id === editUser.id ? { ...user, ...editedData } : user
            );
            resetErrors();
            setData(updatedData);
            setModalOpen(false);
            setEditItem(null);
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
            <InstitutionForm onFormSubmit={handleFormSubmit} />
            {isLoading ? (
                <Loading />
            ) : (
                <>
                    <Table>
                        <thead>
                            <tr>
                                <th>Id</th>
                                <th>Name</th>
                                <th>Region</th>
                                <th>Country</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.length === 0 ? (
                                <tr>
                                    <td colSpan="5" className="text-center">
                                        No data available
                                    </td>
                                </tr>
                            ) : (
                                <>
                                    {data.map((item) => (
                                        <tr key={item.id}>
                                            <td>{item.id}</td>
                                            <td>{item.name}</td>
                                            <td>{item.region}</td>
                                            <td>{item.country}</td>
                                            <td>
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
                                            </td>
                                        </tr>
                                    ))}
                                </>
                            )}
                        </tbody>
                    </Table>
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
                            Edit Item
                        </ModalHeader>
                        <ModalBody>
                            <FormGroup>
                                <Label for="editName">Name:</Label>
                                <Input
                                    type="text"
                                    defaultValue={editItem?.name}
                                    id="editName"
                                    name="editName"
                                    invalid={!!errors.name}
                                />
                                <FormFeedback>{errors.name}</FormFeedback>
                            </FormGroup>
                            <FormGroup>
                                <Label for="editRegion">Region:</Label>
                                <Input
                                    type="text"
                                    defaultValue={editItem?.region}
                                    id="editRegion"
                                    name="editRegion"
                                    invalid={!!errors.region}
                                />
                                <FormFeedback>{errors.region}</FormFeedback>
                            </FormGroup>
                            <FormGroup>
                                <Label for="editCountry">Country:</Label>
                                <Input
                                    type="text"
                                    defaultValue={editItem?.country}
                                    id="editCountry"
                                    name="editCountry"
                                    invalid={!!errors.country}
                                />
                                <FormFeedback>{errors.country}</FormFeedback>
                            </FormGroup>
                        </ModalBody>
                        <ModalFooter>
                            <Button
                                color="primary"
                                onClick={() =>
                                    handleEditFormSubmit({
                                        name: document.getElementById("editName").value,
                                        region: document.getElementById("editRegion").value,
                                        country: document.getElementById("editCountry").value,
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