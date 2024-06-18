import { useMutation } from "@tanstack/react-query";
import { queryClient } from "../../main";

import { Button } from "@/components/ui/button";
import { quizAppInstance } from "../../utils/axios";

const DeleteButton = ({ item }) => {
  const { mutate: deleteItemMutation, data: updatedData } = useMutation(
    async () => {
      mutationFn: (item) =>
        fetch(
          `https://two4-mintep1-app-dev.onrender.com/api/v1/${item.type}/${item.id}`,
          {
            method: DELETE,
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
    }, {
        onSuccess: () => {
            queryClient.invalidateQueries(`${item.type}`)
        }
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
    <Button color="danger" onClick={() => handleDelete(item.id)}>
      Delete
    </Button>
  );
};
export default DeleteButton;
