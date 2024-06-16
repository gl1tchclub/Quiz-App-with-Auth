import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import CardWrapper from "../CardWrapper";
import { useNavigate } from "react-router-dom";

const UpdateForm = ({ onFormSubmit }) => {
  const updateForm = useForm();
  const navigate = useNavigate();
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
};
export default UpdateForm;