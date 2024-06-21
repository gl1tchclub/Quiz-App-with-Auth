import QuizTable from "../components/tables/QuizTable";
import { ErrorAlert } from "../components/Alert";

const QuizPage = () => {
  const quiz = localStorage.getItem("quizId");
  localStorage.removeItem("quizId");

  return (
    <>
    {quiz ? 
      (<div className="w-3/4 flex justify-center">
        <div className="w-full justify-center flex-col">
          <QuizTable />
        </div>
      </div>) : (<ErrorAlert desc="Quiz Unavailable"/>)
    }
    </>
  );
};
export default QuizPage;