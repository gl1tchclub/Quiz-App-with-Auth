/**
 * @file AllQuizzes.jsx
 * @module AllQuizzes
 * @description Page component displaying quizzes based on user authentication status.
 * @author Elizabeth Minty
 */

import AllQuizzesTable from "../components/tables/AllQuizTable";
import { ErrorAlert } from "../components/Alert";

const user = localStorage.getItem('userData');

const QuizzesPage = () => {

  return (
    <>
      {/* Render CreateQuiz component if role is admin */}
      {user.role === "ADMIN_USER" &&
        (
          <div className="justify-center flex">
            <CreateQuiz token={accessToken} />
          </div>
        )}
      <div className="w-3/4 flex justify-center">
        <div className="w-full justify-center flex-col">
          <AllQuizzesTable />
        </div>
      </div>

    </>
  );
};
export default QuizzesPage;
