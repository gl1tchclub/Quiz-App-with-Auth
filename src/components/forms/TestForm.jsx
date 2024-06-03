import { queryClient } from "../../main";
import { useForm } from "react-hook-form";
import { useQuery, useMutation } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
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
import CardWrapper from "../CardWrapper";
// import { Form } from "@/components/ui/form";
// import { Form, FormGroup, Input, UncontrolledAlert } from "reactstrap";

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
      <div className="h-screen flex items-center justify-center">
        <CardWrapper
          hrefLabel="test-register"
          title="Test"
          href="/login"
          buttonLabel="Already have an account? Login here"
          variant="link"
        ></CardWrapper>
      </div>
      <p>{testData?.msg}</p>
    </>
  );
};
export default Test;
