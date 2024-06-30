/**
 * @file RegisterForm.jsx
 * @module RegisterForm
 * @description Form component for user registration using react-hook-form and react-query.
 * Allows users to register with their email, first name, last name, username, password, role, and confirm password.
 */

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
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ReloadIcon } from "@radix-ui/react-icons";

/**
 * RegisterForm component for user registration.
 * @returns {JSX.Element} RegisterForm component JSX
 */
const RegisterForm = () => {
  const registerForm = useForm();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const { mutate: postRegisterMutation, data: registerData } = useMutation({
    mutationFn: (user) =>
      fetch("https://two4-mintep1-app-dev.onrender.com/api/v1/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: user.email,
          firstName: user.firstName,
          lastName: user.lastName,
          username: user.username,
          password: user.password,
          role: user.role || "BASIC_USER",
          confirm_password: user.confirm_password,
        }),
      }).then((res) => {
        if (res.status === 201) {
          registerForm.reset((formValues) => ({
            ...formValues,
            email: "",
            firstName: "",
            lastName: "",
            username: "",
            password: "",
            role: "",
            confirm_password: "",
          }));
        }
        return res.json();
      }),
    onSuccess: (data) => {
      if (!data.error) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("userData", JSON.stringify(data.data));
        localStorage.setItem("error", "false");

        setTimeout(() => {
          navigate("/login");
        }, 1500);
      }
    },
  });

   // Function to handle registration form submission
  const handleRegisterSubmit = (values) => {
    setIsLoading(true);
    postRegisterMutation(values, {
      onSettled: () => {
        setIsLoading(false);
      },
    });
  };

  return (
    <>
      <div className="h-dvh w-1/3 flex items-center justify-center">
        <CardWrapper
          variant="link"
          title="Register"
          buttonLabel="Already have an account? Login here"
          hrefLabel="login"
          href="/login"
          box="w-full shadow-md flex-col"
          button="true"
          buttonStyle="font-normal w-1/3"
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
                  name="role"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Role</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          type="role"
                          placeholder="ADMIN_USER or BASIC_USER. . ."
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
                          type="password"
                          placeholder="**********"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              {registerData?.error ? (
                <p className="text-red-500 text-sm">{registerData.error}</p>
              ) : (
                <p className="text-green-500 text-sm">{registerData?.msg}</p>
              )}
              <Button
                type="submit"
                disabled={isLoading}
                className="w-full bg-pink-500 hover:bg-pink-300 hover:text-pink-600"
              >
                {isLoading ? (
                  <>
                    <ReloadIcon className="mr-2 h-6 w-6 animate-spin" />
                    <p className="mt-3 text-lg">Registering...</p>
                  </>
                ) : (
                  <p className="mt-3 text-lg">Register</p>
                )}
              </Button>
            </form>
          </Form>
        </CardWrapper>
      </div>
    </>
  );
};
export default RegisterForm;
