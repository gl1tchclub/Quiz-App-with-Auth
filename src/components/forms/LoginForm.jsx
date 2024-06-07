import { queryClient } from "../../main";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

// Components
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

const LoginForm = () => {
  const loginForm = useForm();
  const navigate = useNavigate();
  const { mutate: postLoginMutation, data: loginData } = useMutation({
    mutationFn: (user) =>
      fetch("https://two4-mintep1-app-dev.onrender.com/api/v1/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: user.username,
          password: user.password,
        }),
      }).then((res) => {
        if (res.status === 200) {
          loginForm.reset((formValues) => ({
            ...formValues,
            username: "",
            password: "",
          }));
        }
        return res.json();
      }),
      onSuccess: (data) => {
        localStorage.setItem("token", data.token);
        // console.log(data.token);
        localStorage.setItem("userData", data);
        // if (data.token) navigate("/user");
        console.log(JSON.parse(localStorage.getItem("userData")));
      },
    });

  const handleLoginSubmit = (values) => postLoginMutation(values);

  return (
    <>
      <div className="h-dvh w-1/3 flex items-center justify-center">
        <CardWrapper
          variant="link"
          title="Login"
          buttonLabel="Don't have an account? Register here"
          hrefLabel="register"
          href="/register"
          style="w-full shadow-md flex-col"
          button="true"
        >
          <Form {...loginForm}>
            <form
              onSubmit={loginForm.handleSubmit(handleLoginSubmit)}
              className="space-y-6 justify-center"
            >
              <div className="space-y-4">
                <FormField
                  control={loginForm.control}
                  name="username"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Username</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          type="text"
                          placeholder=". . . . . ."
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={loginForm.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          type="password"
                          placeholder="**********"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              {loginData?.error || loginData?.msg ? (
                <p className="text-red-500 text-sm">
                  {loginData?.error || loginData?.msg}
                </p>
              ) : null}
              <Button type="submit" className="w-full bg-pink-500 hover:bg-pink-300 hover:text-pink-600">
                Login
              </Button>
            </form>
          </Form>
        </CardWrapper>
      </div>
    </>
  );
};

export default LoginForm;
