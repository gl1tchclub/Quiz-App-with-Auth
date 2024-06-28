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
import { ReloadIcon } from "@radix-ui/react-icons";

const CreateQuiz = ({ refetch }) => {
  const [isLoading, setIsLoading] = useState(false);
  const createQuizForm = useForm();
  const { mutate: postQuizMutation, data: quizData } = useMutation({
    mutationFn: (quiz) =>
      fetch("https://two4-mintep1-app-dev.onrender.com/api/v1/quizzes/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          categoryId: quiz.categoryId,
          name: quiz.name,
          type: quiz.type,
          difficulty: quiz.difficulty,
          startDate: quiz.startDate,
          endDate: quiz.endDate,
        }),
      }).then((res) => {
        if (res.status === 201) {
          createQuizForm.reset((formValues) => ({
            ...formValues,
            categoryId: "",
            name: "",
            type: "",
            difficulty: "",
            startDate: "",
            endDate: "",
          }));
        }
        return res.json();
      }),
    onSuccess: (data) => {
      if (!data.error) refetch();
    },
  });

  const handleCreateQuizSubmit = (values) => {
    setIsLoading(true);
    postQuizMutation(values, {
      onSettled: () => {
        setIsLoading(false);
      },
    });
  };

  return (
    <>
      <Navigation />
      <h2>Quiz</h2>
      <form onSubmit={createQuizForm.handleSubmit(handleCreateQuizSubmit)}>
        {/* change to radio buttons */}
        <label htmlFor="quiz-question">Email</label>
        <input
          type="text"
          id="quiz-email"
          name="email"
          {...createQuizForm.quiz("email")}
        />
        <label htmlFor="quiz-answer">Password</label>
        <input
          type="radio"
          id="quiz-answer"
          name="answer"
          {...createQuizForm.quiz("answer")}
        />
        <button type="submit">Submit</button>
      </form>
      <p>{quizData?.msg}</p>

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
};

export default CreateQuiz;
