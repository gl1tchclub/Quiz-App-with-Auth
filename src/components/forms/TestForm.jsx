import { queryClient } from "../../main";
import { useForm } from "react-hook-form";
import { useQuery, useMutation } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
// import { Form } from "@/components/ui/form";
// import { Form, FormGroup, Input, UncontrolledAlert } from "reactstrap";
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

const Test = () => {
  const testForm = useForm();
  const { mutate: postTestMutation, data: testData } = useMutation({
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
          testForm.reset((formValues) => ({
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

  const handleTestSubmit = (values) => postTestMutation(values);
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
          <h1 style={{ margin: "20px 0" }}>Test</h1>
          <Form>
            <form
              onSubmit={testForm.handleSubmit(handleTestSubmit)}
              style={{ display: "flexbox" }}
              className="space-y-8"
            >
              <FormField 
              control={register.control}
              name="Email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="Email" type="text" {...testForm.test("email")} />
                  </FormControl>
                  <FormDescription>
                    This is the email associated with your account.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
              />

              <FormField 
              
              />
              <input
                type="text"
                id="test-firstname"
                name="firstname"
                placeholder="First Name"
                {...testForm.register("firstName")}
              />

              <FormField />
              <input
                type="text"
                id="test-lastname"
                name="lastname"
                placeholder="Last Name"
                {...testForm.register("lastName")}
              />

              <FormField />
              <input
                type="password"
                id="test-password"
                name="password"
                placeholder="Password"
                {...testForm.register("password")}
              />

              <FormField />
              <input
                type="text"
                id="test-username"
                name="username"
                placeholder="Username"
                {...testForm.register("username")}
              />

              <FormField />
              <input
                type="password"
                id="confirm_password"
                name="confirm_password"
                placeholder="Confirm Password"
                {...testForm.register("confirm_password")}
              />

              <Button
                type="submit"
                style={{ marginBottom: "1rem", width: "20%" }}
                variant="outline"
              >
                Test
              </Button>
            </form>
          </Form>
          <p>{testData?.msg}</p>
        </div>
      </div>
    </>
  );
};
export default Test;
