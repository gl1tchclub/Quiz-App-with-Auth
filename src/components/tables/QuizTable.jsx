/**
 * @file QuizTable.jsx
 * @module components/QuizTable
 * @description Displays a quiz with questions and options for user interaction.
 * Allows users to select answers and submit the quiz.
 * @author Your Name
 */

import { useState, useEffect } from "react";
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

/**
 * Functional component for rendering a quiz table.
 * Manages quiz data fetching, user answers, and submission.
 * @param {Object} props - Component props containing quizId.
 * @returns {JSX.Element} Rendered QuizTable component.
 */
const QuizTable = (props) => {
  const [quiz, setQuiz] = useState(null);
  const [selectedAnswers, setSelectedAnswers] = useState({});

  useEffect(() => {
    const fetchQuiz = async () => {
      try {
        const response = await fetch(
          `https://two4-mintep1-app-dev.onrender.com/api/v1/public/quiz/${props.quizId}`,
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
        setQuiz(data);
      } catch (error) {
        console.error(error);
      }
    };

    
    fetchQuiz();
  }, [props.quizId]);
  
  if (!quiz) {
    return <ErrorAlert desc="Unauthorized. Please log in" />;
  }

    /**
   * Handles change in selected answer for a question.
   * Updates the selectedAnswers state with the selected option for the specified question.
   * @param {number} questionIndex - Index of the question being answered.
   * @param {string} selectedOption - Selected answer option for the question.
   */
  const handleAnswerChange = (questionIndex, selectedOption) => {
    setSelectedAnswers({
      ...selectedAnswers,
      [questionIndex]: selectedOption,
    });
  };

  const handleSubmitQuiz = () => {
    // Logic to submit quiz answers
    console.log("Selected Answers:", selectedAnswers);
    // Implement your logic here for submitting answers
  };

  const participate = () => {};

  return (
    <>
      <CardWrapper
        title={quiz.name}
        box="w-fit mx-auto bg-pink-300 shadow-lg rounded-lg p-6 mt-20"
        label="Answer all 10 questions correctly to win!"
      >
        <Carousel>
          <CarouselContent>
            {quiz.questions.map((question, index) => (
              <CarouselItem key={question.id}>
                <Card>
                  <CardContent className="p-6">
                    <h2 className="text-xl font-bold mb-4">
                      {question.question}
                    </h2>
                    <ul>
                      {question.options.map((option, optionIndex) => (
                        <li key={optionIndex} className="mb-2">
                          <label className="flex items-center space-x-2">
                            <input
                              type="radio"
                              name={`question-${index}`}
                              value={option}
                              checked={selectedAnswers[index] === option}
                              onChange={() => handleAnswerChange(index, option)}
                            />
                            <span>{option}</span>
                          </label>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>

        <div className="mt-4">
          <button
            className="bg-pink-500 hover:bg-pink-400 text-white font-bold py-2 px-4 rounded"
            onClick={handleSubmitQuiz}
          >
            Submit Quiz
          </button>
        </div>
      </CardWrapper>
    </>
  );
};

export default QuizTable;
