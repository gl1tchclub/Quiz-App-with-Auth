/**
 * @file AllQuizzes.jsx
 * @module AllQuizzes
 * @description Page component displaying quizzes based on user authentication status.
 * @author Elizabeth Minty
 */

import AllQuizzesTable from "../components/tables/AllQuizTable";
import { ErrorAlert } from "../components/Alert";
import CreateQuiz from "../components/forms/CreateQuizForm";

const user = JSON.parse(localStorage.getItem('userData'));
const token = localStorage.getItem("token");

const QuizzesPage = () => {

  return (
    <>
      {/* Render CreateQuiz component if role is admin */}
      <div className="justify-center flex-col items-center">      
        {user && user.role === "ADMIN_USER" &&
        (
          <div className="justify-center flex">
            <CreateQuiz token={token} />
          </div>
        )}
      <div className="w-3/4 flex justify-center">
        <div className="w-full justify-center flex-col">
          <AllQuizzesTable />
        </div>
      </div>
</div>
    </>
  );
};
export default QuizzesPage;
