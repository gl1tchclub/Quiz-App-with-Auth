import { queryClient } from "../../main";

import { useForm } from "react-hook-form";
import { useQuery, useMutation } from "@tanstack/react-query";

const { mutate: postRegisterMutation, data: registerData } = useMutation({
    mutationFn: (user) =>
      fetch("http://localhost:3000/api/v1/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: user.email,
          firstName: user.firstName,
          lastName: user.lastName,
          password: user.password,
          username: user.username,
          role: user.role,
          confirm_password: user.confirm_password,
        }),
      }).then((res) => {
        if (res.status === 201) {
          registerForm.reset((formValues) => ({
            ...formValues,
            email: "",
            firstName: "",
            lastName: "",
            password: "",
            username: "",
            role: "",
            confirm_password: "",
          }));
        }
        return res.json();
      }),
  });

  const handleRegisterSubmit = (values) => postRegisterMutation(values);

  return (
    <>
      <Navigation/>
      <h2>Register</h2>
      <form onSubmit={registerForm.handleSubmit(handleRegisterSubmit)}>
        <label htmlFor="register-email">Email</label>
        <input
          type="text"
          id="register-email"
          name="email"
          {...registerForm.register("email")}
        />
        <label htmlFor="register-firstname">First Name</label>
        <input
          type="text"
          id="register-firstname"
          name="firstname"
          {...registerForm.register("firstname")}
        />
        <label htmlFor="register-lastname">Last Name</label>
        <input
          type="text"
          id="register-lastname"
          name="lastname"
          {...registerForm.register("lastname")}
        />
        <label htmlFor="register-password">Password</label>
        <input
          type="password"
          id="register-password"
          name="password"
          {...registerForm.register("password")}
        />
        <label htmlFor="register-username">Username</label>
        <input
          type="text"
          id="register-username"
          name="username"
          {...registerForm.register("username")}
        />
        <label htmlFor="register-role">Role</label>
        <input
          type="text"
          id="role"
          name="role"
          {...registerForm.register("role")}
        />
        <label htmlFor="register-confirm-password">Confirm Password</label>
        <input
          type="password"
          id="confirm_password"
          name="confirm_password"
          {...registerForm.register("confirm_password")}
        />
        <button type="submit">Submit</button>
      </form>
      <p>{registerData?.msg}</p>

      <button
        onClick={() => {
          localStorage.removeItem("token");
          // queryClient.invalidateQueries("institutionData");
        }}
      >
        Logout
      </button>
    </>
  );