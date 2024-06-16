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
            const res = await quizAppInstance.get("/users");
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
}