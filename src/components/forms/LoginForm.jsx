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
      <div className="h-dvh w-1/3 flex items-center justify-center">
        <CardWrapper
          variant="link"
          title="Register"
          buttonLabel="Already have an account? Login here"
          hrefLabel="login"
          href="/login"
        >
          <Form {...registerForm}>
            <form
              onSubmit={registerForm.handleSubmit(handleRegisterSubmit)}
              className="space-y-6 justify-center"
            >
              <div className="space-y-4">
                <FormField
                  control={registerForm.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          type="email"
                          placeholder=". . . . . ."
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={registerForm.control}
                  name="firstName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>First Name</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          type="firstName"
                          placeholder=". . . . . ."
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={registerForm.control}
                  name="lastName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Last Name</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          type="lastName"
                          placeholder=". . . . . ."
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={registerForm.control}
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
                <FormField
                  control={registerForm.control}
                  name="username"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Username</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          type="username"
                          placeholder=". . . . . ."
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={registerForm.control}
                  name="confirm_password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Confirm Password</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          type="confirm_password"
                          placeholder="**********"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <Button type="submit" className="w-full bg-pink-500 hover:bg-pink-300 hover:text-pink-600">
                Register
              </Button>
            </form>
          </Form>
        </CardWrapper>
        <p>{registerData?.msg}</p>
      </div>
    </>
  );
};

export default LoginForm;
