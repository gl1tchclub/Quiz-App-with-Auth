import { useState } from "react";
import { queryClient } from "../../main";

// Components
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";
import { ErrorAlert } from "../Alert";
import CardWrapper from "../CardWrapper";
import UpdateDialog from "../UpdateDialog";

const QuizTable = () => {
  const user = JSON.parse(localStorage.getItem("userData"));

  if (!user) {
    return <ErrorAlert desc="Unauthorized. Please log in" />;
  }

  const fetchQuiz = async () => {
    try {
      // Perform update operation (e.g., API call)
      const response = await fetch(
        `https://two4-mintep1-app-dev.onrender.com/api/v1/public/quiz/${localStorage.getItem("quizId")}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (!response.ok) {
        throw new Error("Failed to get quiz");
      }
      const data = await response.json();
      console.log("Quiz:", data);
      localStorage.removeItem("quizId");
      return data;
    } catch (error) {
      console.error("Get quiz error:", error);
    }
  };

  const quiz = fetchQuiz();

  const participate = () => {};

  return (
    <>
      <CardWrapper
        title={quiz.name}
        box="w-fit mx-auto bg-pink-300 shadow-lg rounded-lg p-6 mt-20"
        label="Answer all 10 questions correctly to win!"
      >
        <Table>
          <TableBody>
            {quiz.questions.map((question, index) => (
              <TableRow key={`${quiz.id}-${index}`}>
                <TableCell colSpan="5" className="pl-8">
                  <strong>{question.question}</strong>
                </TableCell>
                <TableCell colSpan="2">
                  <ul className="ml-4">
                    {question.incorrectAnswers.map((answer, idx) => (
                      <li key={`${quiz.id}-${index}-${idx}`}>{answer}</li>
                    ))}
                    <li>{question.correctAnswer}</li>
                  </ul>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardWrapper>
    </>
  );
};

export default QuizTable;
