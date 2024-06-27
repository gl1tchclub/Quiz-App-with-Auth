import InfoCard from "./InfoCard";

const App = () => {
  const data = [
    {
      title: "Register User",
      description: "Register a new user.",
      method: "POST",
      url: "/api/v1/auth/register",
      requestBody: {
        email: "string",
        firstName: "string",
        lastName: "string",
        username: "string",
        password: "string",
        confirm_password: "string",
      },
      responseBody: {
        msg: "User registered successfully",
        data: "user object",
      },
    },
    {
      title: "Login User",
      description: "Login to a registered user.",
      method: "POST",
      url: "/api/v1/auth/login",
      requestBody: {
        username: "string",
        password: "string",
      },
      responseBody: {
        token: "string",
        data: "user object",
      },
    },
    {
      title: "Create Quiz - Admin Only",
      description: "Create a quiz",
      method: "POST",
      url: "/api/v1/quizzes/create",
      requestBody: {
        categoryId: "integer (9-32)",
        name: "string",
        type: "string (multiple, boolean)",
        difficulty: "string (easy, medium, hard)",
        startDate: "string (DD/MM/YYYY)",
        endDate: "string (DD/MM/YYYY)"
      },
      responseBody: {
        msg: "Quiz successfully created",
        data: "quiz object",
      },
    },
  ];

  return (
    <>
      {data.map((api, index) => (
        <InfoCard
          key={index}
          title={api.title}
          description={api.description}
          method={api.method}
          url={api.url}
          requestBody={api.requestBody}
          responseBody={api.responseBody}
        />
      ))}
    </>
  );
};

export default App;
