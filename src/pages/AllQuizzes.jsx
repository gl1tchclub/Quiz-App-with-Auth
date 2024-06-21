import AllQuizzesTable from "../components/tables/QuizTable";
import { ErrorAlert } from "../components/Alert";

const QuizzesPage = () => {
  return (
    <>
    {AllQuizzesTable ? 
      (<div className="w-3/4 flex justify-center">
        <div className="w-full justify-center flex-col">
          <AllQuizzesTable />
        </div>
      </div>) : (<ErrorAlert desc="Error with quiz table"/>)
    }
    </>
  );
};
export default QuizzesPage;
