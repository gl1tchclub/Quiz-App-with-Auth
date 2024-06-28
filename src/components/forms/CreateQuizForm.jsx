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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import CardWrapper from "../CardWrapper";
import { useState } from "react";
import { ReloadIcon } from "@radix-ui/react-icons";

const CreateQuiz = (props) => {
  const [isLoading, setIsLoading] = useState(false);
  const createQuizForm = useForm();

  const { mutate: postQuizMutation, data: quizData } = useMutation({
    mutationFn: (quiz) =>
      fetch("https://two4-mintep1-app-dev.onrender.com/api/v1/quizzes/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${props.token}`,
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
      // if (!data.error) invalidate quiz data;
    },
  });

  // Fetch categories
  const { data: categories, isLoading: categoriesLoading } = useQuery({
    queryKey: ["categories"],
    queryFn: async () => {
      const res = await fetch("https://opentdb.com/api_category.php");
      const data = await res.json();
      return data.trivia_categories;
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
