import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { queryClient } from "../../main";
import { useMutation } from "@tanstack/react-query";

// Components
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Toggle } from "@/components/ui/toggle";
import { Button } from "@/components/ui/button";
import { TrashIcon } from "@radix-ui/react-icons";

import CardWrapper from "../CardWrapper";
import Loading from "../Load";
import UpdateDialog from "../UpdateDialog";
import { ErrorAlert } from "../Alert";

const AllQuizzesTable = () => {
  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("userData"));

  if (!user) {
    return <ErrorAlert desc="Unauthorized. Please log in" />;
  }

  const [type, setType] = useState(null); // for old, active, future quizzes (need to implement)

  // Get All Quizzes
  const {
    isLoading,
    data: quizzes,
    error,
    refetch,
  } = useQuery({
    queryKey: ["quizzes"],
    queryFn: () =>
      fetch(`https://two4-mintep1-app-dev.onrender.com/api/v1/public/all`).then(
        (res) => res.json()
      ),
    onSuccess: (data) => {
      console.log(JSON.parse(data));
    },
  });

  // Delete quiz
  const { mutate: deleteQuizMutation, data: updatedData } = useMutation({
    mutationFn: async ({ id }) => {
      const response = await fetch(
        `https://two4-mintep1-app-dev.onrender.com/api/v1/public/all/${id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (!response.ok) {
        throw new Error("Failed to delete quiz");
      }
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries("quizzes");
      refetch();
    },
    onError: (error) => {
      console.error("Delete mutation error:", error);
    },
  });

  const handleDelete = (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this quiz?"
    );
    if (confirmDelete) {
      try {
        deleteQuizMutation({ id });
      } catch (err) {
        console.log(err);
      }
    }
  };

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <CardWrapper
          title="Dashboard"
          box="w-fit mx-auto bg-pink-300 shadow-lg rounded-lg p-6 mt-20"
          label="Your quiz information"
        >
          <section className="text-pink-700 bg-pink-200 rounded-lg p-6 shadow-md">
            <Table className="hover:none">
              <TableHeader className="text-lg text-pink-700 ">
                <TableRow className="border-b-2 border-pink-300 hover:bg-transparent">
                  <TableHead className="text-inherit py-2 px-4">Name</TableHead>
                  <TableHead className="text-inherit py-2 px-4">Type</TableHead>
                  <TableHead className="text-inherit py-2 px-4">
                    Difficulty
                  </TableHead>
                  <TableHead className="text-inherit py-2 px-4">
                    Start Date
                  </TableHead>
                  <TableHead className="text-inherit py-2 px-4">
                    End Date
                  </TableHead>

                  <TableHead className="text-inherit py-2 px-4">
                    Questions
                  </TableHead>
                  <TableHead className="text-inherit py-2 px-4">
                    Options
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody className="text-gray-700 font-semibold">
                {error ? (
                  <TableRow>
                    <TableCell colSpan="3">{error.message}</TableCell>
                  </TableRow>
                ) : (
                  quizzes.data.map((quiz) => (
                    <TableRow key={quiz.id}>
                      <TableCell>{quiz.name}</TableCell>
                      <TableCell>{quiz.type}</TableCell>
                      <TableCell>{quiz.difficulty}</TableCell>
                      <TableCell>{quiz.startDate}</TableCell>
                      <TableCell>{quiz.endDate}</TableCell>
                      <TableCell>{quiz.questions}</TableCell>
                      <TableCell>
                        <ul>
                          {quiz.questions.map((question, index) => (
                            <li key={index} className="mb-2">
                              <strong>{question.question}</strong>
                              <ul className="ml-4">
                                {question.incorrectAnswers.map(
                                  (answer, index) => (
                                    <li key={index}>{answer}</li>
                                  )
                                )}
                                <li>
                                  {question.correctAnswer}
                                </li>
                              </ul>
                            </li>
                          ))}
                        </ul>
                      </TableCell>
                      <TableCell>
                        <Button
                          className="bg-pink-500 hover:bg-pink-400"
                          onClick={() => handleDelete(quiz.id)}
                        >
                          {/* <TrashIcon className="h-4 w-4" /> */}
                          Delete
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </section>
        </CardWrapper>
      )}
    </>
  );
};

export default AllQuizzesTable;
