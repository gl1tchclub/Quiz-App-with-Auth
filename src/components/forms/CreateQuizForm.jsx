const CreateQuiz = () => {
    const createQuizForm = useForm();
    const { mutate: postQuizMutation, data: quizData } = useMutation({
        mutationFn: (user) =>
          fetch("http://localhost:3000/api/v1/auth/quiz", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              email: user.email,
              password: user.password,
            }),
          }).then((res) => {
            if (res.status === 200) {
                createQuizForm.reset((formValues) => ({
                ...formValues,
                email: "",
                password: "",
              }));
            }
            return res.json();
          }),
        onSuccess: (data) => {
        //   localStorage.setItem("token", data.token);
        //   queryClient.invalidateQueries("userData");
        },
      });
    
      const handleCreateQuizSubmit = (values) => postQuizMutation(values);
    
      return (
        <>
          <Navigation/>
          <h2>Quiz</h2>
          <form onSubmit={createQuizForm.handleSubmit(handleCreateQuizSubmit)}>
            {/* change to radio buttons */}
            <label htmlFor="quiz-question">Email</label>
            <input
              type="text"
              id="quiz-email"
              name="email"
              {...createQuizForm.quiz("email")}
            />
            <label htmlFor="quiz-answer">Password</label>
            <input
              type="radio"
              id="quiz-answer"
              name="answer"
              {...createQuizForm.quiz("answer")}
            />
            <button type="submit">Submit</button>
          </form>
          <p>{quizData?.msg}</p>
    
          <button
            onClick={() => {
              localStorage.removeItem("token");
              // queryClient.invalidateQueries("institutionData");
            }}
          >
            Logout
          </button>
        </>
      );
}

  export default CreateQuiz;