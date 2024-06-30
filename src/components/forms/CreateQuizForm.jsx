/**
 * @file CreateQuiz.jsx
 * @module CreateQuiz
 * @description Component for creating a quiz with form submission and mutation handling.
 * Renders a form to create a quiz, handles form submission, and displays loading states.
 * Utilizes react-hook-form for form handling and @tanstack/react-query for mutation and query management.
 * @author Your Name
 */

import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { useQuery } from "@tanstack/react-query";
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


/**
 * CreateQuiz component for creating quizzes.
 * @param {object} props - Component props
 * @param {string} props.token - Authorization token for API requests
 * @returns {JSX.Element} CreateQuiz component JSX
 */
const CreateQuiz = (props) => {
  const [isLoading, setIsLoading] = useState(false);
  const createQuizForm = useForm();

  // Mutation hook for posting quiz data
  const { mutate: postQuizMutation, data: quizData } = useMutation({
    mutationFn: async (quiz) => {
      // Filter out empty fields from quiz object
      const filteredQuiz = Object.fromEntries(
        Object.entries(quiz).filter(([_, value]) => value !== '')
      );

      return fetch("https://two4-mintep1-app-dev.onrender.com/api/v1/quizzes/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${props.token}`,
        },
        body: JSON.stringify(filteredQuiz),
      }).then((res) => {
        console.log(filteredQuiz.startDate)
        if (res.status === 201) {
          createQuizForm.reset({
            categoryId: "",
            name: "",
            type: "",
            difficulty: "",
            startDate: "",
            endDate: "",
          });
        }
        return res.json();
      });
    },
  });

  // Query hook for fetching categories
  const { data: categories, isLoading: categoriesLoading } = useQuery({
    queryKey: ["categories"],
    queryFn: async () => {
      const res = await fetch("https://opentdb.com/api_category.php");
      const data = await res.json();
      return data.trivia_categories;
    },
  });

  /**
 * Handles form submission for creating a quiz.
 * @param {Object} values - Form values submitted
 */
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
      <div className="h-dvh w-1/3 flex items-center justify-center">
        <CardWrapper
          title="Create Quiz"
          href="/quizzes"
          box="w-full shadow-md flex-col"
        >
          <Form {...createQuizForm}>
            <form
              onSubmit={createQuizForm.handleSubmit(handleCreateQuizSubmit)}
              className="space-y-6 justify-center"
            >
              <div className="space-y-4">
                <FormField
                  control={createQuizForm.control}
                  name="categoryId"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Category</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder=". . . . ." />
                      </FormControl>
                      <FormDescription>Optional. Enter a number from 9-32</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={createQuizForm.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Quiz Name</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder=". . . . ." />
                      </FormControl>
                      <FormDescription>Required</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={createQuizForm.control}
                  name="type"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Type</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder=". . . . ." />
                      </FormControl>
                      <FormDescription>Optional. Multiple or boolean</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={createQuizForm.control}
                  name="difficulty"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Difficulty</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder=". . . . ."
                        />
                      </FormControl>
                      <FormDescription>Optional. Easy, medium, or hard.</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={createQuizForm.control}
                  name="startDate"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Start Date</FormLabel>
                      <FormControl>
                        <Input type="date" {...field} />
                      </FormControl>
                      <FormDescription>Required. Must start from at least today's date.</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={createQuizForm.control}
                  name="endDate"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>End Date</FormLabel>
                      <FormControl>
                        <Input type="date" {...field} />
                      </FormControl>
                      <FormDescription>Required. Must be greater than start date.</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              {quizData?.error ? (
                <p className="text-red-500 text-sm">{quizData.error}</p>
              ) : (
                <p className="text-green-500 text-sm">{quizData?.msg}</p>
              )}
              <Button
                type="submit"
                disabled={isLoading}
                className="w-full bg-pink-500 hover:bg-pink-300 hover:text-pink-600"
              >
                {isLoading ? (
                  <>
                    <ReloadIcon className="mr-2 h-6 w-6 animate-spin" />
                    <p className="mt-3 text-lg">Creating quiz...</p>
                  </>
                ) : (
                  <p className="mt-3 text-lg">Create</p>
                )}
              </Button>
            </form>
          </Form>
        </CardWrapper>
      </div>
    </>
  );
};

export default CreateQuiz;
