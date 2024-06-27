import CardWrapper from "../components/CardWrapper";
import LinkButton from "../components/buttons/LinkButton";

const HomePage = () => {
  const style = "bg-pink-600 text-white font-bold w-1/3 rounded-lg hover:bg-pink-400 h-12 text-lg";
  return (
    <div className="w-full h-dvh flex items-center justify-center">
      <CardWrapper
        title="Welcome to the Quiz App"
        label="Made by Mintep1"
        box="justify-center items-center w-1/2 mx-auto bg-pink-300 shadow-lg rounded-lg p-6 mb-40"
      >
        <div className="flex justify-between px-44">
          <LinkButton
            href="/register"
            buttonLabel="Get Started!"
            buttonStyle={style}
          />
          <LinkButton
            href="/quizzes"
            buttonLabel="See Our Quizzes"
            buttonStyle={style}
          />
        </div>
      </CardWrapper>
    </div>
  );
};
export default HomePage;
