import AllQuizzesTable from "../components/tables/AllQuizTable";
import { ErrorAlert } from "../components/Alert";

  const accessToken = localStorage.getItem('token');

  const QuizzesPage = () => {

    return (
      <>
        {!accessToken && <div className="justify-center flex">
          <CreateQuiz token={accessToken} />
        </div>}
        {AllQuizzesTable ?
          (<div className="w-3/4 flex justify-center">
            <div className="w-full justify-center flex-col">
              <AllQuizzesTable />
            </div>
          </div>) : (<ErrorAlert desc="Error with quiz table" />)
        }
      </>
    );
  };
  export default QuizzesPage;
