import { queryClient } from "../../main";

import { useForm } from "react-hook-form";
import { useQuery, useMutation } from "@tanstack/react-query";

const Login = () => {
    const loginForm = useForm();
    const { mutate: postLoginMutation, data: loginData } = useMutation({
        mutationFn: (user) =>
          fetch("http://localhost:3000/api/v1/auth/login", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              email: user.email,
              password: user.password,
            }),
          }).then((res) => {
            if (res.status === 200) {
              loginForm.reset((formValues) => ({
                ...formValues,
                email: "",
                password: "",
              }));
            }
            return res.json();
          }),
        onSuccess: (data) => {
          localStorage.setItem("token", data.token);
          queryClient.invalidateQueries("institutionData");
        },
      });
    
      const handleLoginSubmit = (values) => postLoginMutation(values);
    
      return (
        <>
          <Navigation/>
          <h2>Login</h2>
          <form onSubmit={loginForm.handleSubmit(handleLoginSubmit)}>
            <label htmlFor="login-email">Email</label>
            <input
              type="text"
              id="login-email"
              name="email"
              {...loginForm.login("email")}
            />
            <label htmlFor="login-firstname">First Name</label>
            <input
              type="text"
              id="login-firstname"
              name="firstname"
              {...loginForm.login("firstname")}
            />
            <label htmlFor="login-lastname">Last Name</label>
            <input
              type="text"
              id="login-lastname"
              name="lastname"
              {...loginForm.login("lastname")}
            />
            <label htmlFor="login-password">Password</label>
            <input
              type="password"
              id="login-password"
              name="password"
              {...loginForm.login("password")}
            />
            <label htmlFor="login-username">Username</label>
            <input
              type="text"
              id="login-username"
              name="username"
              {...loginForm.login("username")}
            />
            <label htmlFor="login-role">Role</label>
            <input
              type="text"
              id="role"
              name="role"
              {...loginForm.login("role")}
            />
            <label htmlFor="login-confirm-password">Confirm Password</label>
            <input
              type="password"
              id="confirm_password"
              name="confirm_password"
              {...loginForm.login("confirm_password")}
            />
            <button type="submit">Submit</button>
          </form>
          <p>{loginData?.msg}</p>
    
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
}

  export default Login;