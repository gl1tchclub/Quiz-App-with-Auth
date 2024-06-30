/**
 * @file Quiz.jsx
 * @module Quiz
 * @description Page component for displaying a specific quiz table based on quiz ID.
 * @author Elizabeth Minty
 */

import QuizTable from "../components/tables/QuizTable";
import { ErrorAlert } from "../components/Alert";

const QuizPage = () => {
  const quizId = localStorage.getItem("quizId");

  if (!quizId) {
    return (
      <ErrorAlert desc="Quiz ID not found. Please select a quiz to play." />
    );
  }

  return (
    <div className="w-3/4 flex justify-center">
      <div className="w-full justify-center flex-col">
        <QuizTable quizId={quizId} />
      </div>
    </div>
  );
};

export default QuizPage;
