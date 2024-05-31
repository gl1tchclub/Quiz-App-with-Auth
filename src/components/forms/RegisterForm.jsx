import { queryClient } from "../../main";
import { useForm } from "react-hook-form";
import { useQuery, useMutation } from "@tanstack/react-query";
import { Button, Form, FormGroup, Input, UncontrolledAlert } from "reactstrap";

const Register = () => {
  const registerForm = useForm();
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
            confirm_password: "",
          }));
        }
        return res.json();
      }),
  });

  const handleRegisterSubmit = (values) => postRegisterMutation(values);

  return (
    <>
      <div style={{ display: "block", margin: "40px 70px", width: "30%" }}>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            flexDirection: "column",
            width: "100%",
            textAlign: "center",
          }}
        >
          <h1 style={{ margin: "20px 0" }}>Register</h1>
          <form onSubmit={registerForm.handleSubmit(handleRegisterSubmit)} style={{ display: "flexbox" }}>
            <label htmlFor="register-email" style={{ margin: "20px 0",  }}>Email:</label>
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
              {...registerForm.register("firstName")}
            />
            <label htmlFor="register-lastname">Last Name</label>
            <input
              type="text"
              id="register-lastname"
              name="lastname"
              {...registerForm.register("lastName")}
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
            <label htmlFor="register-confirm_password">Confirm Password</label>
            <input
              type="password"
              id="confirm_password"
              name="confirm_password"
              {...registerForm.register("confirm_password")}
            />
            <Button
              type="submit"
              style={{ marginBottom: "1rem", width: "100%" }}
            >
              Register
            </Button>
          </form>
          <p>{registerData?.msg}</p>
        </div>
      </div>
    </>
  );
};
export default Register;
