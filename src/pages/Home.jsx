import CardWrapper from "../components/CardWrapper";

const HomePage = () => {
  return (
    <div className="w-3/5 h-dvh py-6 flex items-center justify-center">
    <CardWrapper
      title="Welcome to the Quiz App"
      variant="outline"
      href="/register"
      label="Made by Mintep1"
      buttonLabel="Click to get started!"
      button="true"
    ></CardWrapper>
    </div>
  );
};
export default HomePage;