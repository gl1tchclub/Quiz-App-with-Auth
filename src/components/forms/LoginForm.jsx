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
    },
  });

  const handleLoginSubmit = (values) => postLoginMutation(values);

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
          <h1 style={{ margin: "20px 0" }}>Login</h1>
          <form onSubmit={loginForm.handleSubmit(handleLoginSubmit)}>
            <label htmlFor="login-email">Email</label>
            <input
              type="text"
              id="login-email"
              name="email"
              {...loginForm.login("email")}
            />
            <label htmlFor="login-password">Password</label>
            <input
              type="password"
              id="login-password"
              name="password"
              {...loginForm.login("password")}
            />
            <button type="submit">Login</button>
          </form>
          <p>{loginData?.msg}</p>
        </div>
      </div>
    </>
  );
};

export default Login;
