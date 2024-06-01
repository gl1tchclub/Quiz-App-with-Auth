import { queryClient } from "../../main";
import { useForm } from "react-hook-form";
import { useQuery, useMutation } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Form, FormGroup, Input, UncontrolledAlert } from "reactstrap";

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
          <Form
            onSubmit={registerForm.handleSubmit(handleRegisterSubmit)}
            style={{ display: "flexbox" }}
          >
            <FormGroup>
              <input
                type="text"
                id="register-email"
                name="email"
                placeholder="Email"
                {...registerForm.register("email")}
              />
            </FormGroup>
            <FormGroup>
              <input
                type="text"
                id="register-firstname"
                name="firstname"
                placeholder="First Name"
                {...registerForm.register("firstName")}
              />
            </FormGroup>
            <FormGroup>
              <input
                type="text"
                id="register-lastname"
                name="lastname"
                placeholder="Last Name"
                {...registerForm.register("lastName")}
              />
            </FormGroup>
            <FormGroup>
              <input
                type="password"
                id="register-password"
                name="password"
                placeholder="Password"
                {...registerForm.register("password")}
              />
            </FormGroup>
            <FormGroup>
              <input
                type="text"
                id="register-username"
                name="username"
                placeholder="Username"
                {...registerForm.register("username")}
              />
            </FormGroup>
            <FormGroup>
              <input
                type="password"
                id="confirm_password"
                name="confirm_password"
                placeholder="Confirm Password"
                {...registerForm.register("confirm_password")}
              />
            </FormGroup>
            <Button
              type="submit"
              style={{ marginBottom: "1rem", width: "20%" }}
            >
              Register
            </Button>
          </Form>
          <p>{registerData?.msg}</p>
        </div>
      </div>
    </>
  );
};
export default Register;
