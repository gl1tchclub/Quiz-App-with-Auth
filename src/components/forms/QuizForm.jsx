/**
 * @file Quiz.jsx
 * @module Quiz
 * @description Component for displaying quizzes fetched from an API using react-query.
 * Utilizes useInfiniteQuery for paginated fetching and displays quiz data in a table.
 */

import { queryClient } from "../../main";
import { useQuery, useInfiniteQuery } from "@tanstack/react-query";
import { useForm } from "react-hook-form";

/**
 * Quiz component to display paginated quiz data.
 * @returns {JSX.Element} Quiz component JSX
 */
const Quiz = () => {
  const {
    isLoading,
    data: quizData,
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
  } = useInfiniteQuery({
    queryKey: ["quizData"],
    queryFn: ({ pageParam = 1 }) =>
      fetch(
        `https://id607001-graysono-1i3w.onrender.com/api/institutions?page=${pageParam}&amount=5`
      ).then((res) => res.json()),
    getNextPageParam: (prevData) => prevData.nextPage,
  });

  if (isLoading) return "Loading...";

  return (
    <>
      <table>
        <thead>
          <tr>
            <th>Quiz</th>
            <th>Question</th>
            <th>Choices</th>
          </tr>
        </thead>
        <tbody>
          {quizData.pages[0].msg ? (
            <tr>
              <td colSpan="3">{quizData.pages[0].msg}</td>
            </tr>
          ) : (
            <>
              {quizData.pages
                .flatMap((data) => data.data)
                .map((quiz, index) => (
                  <tr key={quiz.id}>
                    {/* add question form here */}
                    <td>{quiz.name}</td>
                    <td>{quiz.questions[index]}</td>
                    <td>{quiz.country}</td>
                  </tr>
                ))}
            </>
          )}
        </tbody>
      </table>
      {hasNextPage && (
        <button onClick={() => fetchNextPage()}>
          {isFetchingNextPage ? "Loading..." : "Load More"}
        </button>
      )}
    </>
  );
};
export default Quiz;