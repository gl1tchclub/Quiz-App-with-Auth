import CardWrapper from "../components/CardWrapper";
import LinkButton from "../components/buttons/LinkButton";

const HomePage = () => {
  return (
    <div className="w-3/5 h-dvh py-6 flex items-center justify-center">
      <CardWrapper
        title="Welcome to the Quiz App"
        label="Made by Mintep1"
        box="justify-center items-center"
      >
        <div className="flex justify-between">
          <LinkButton
            href="/register"
            buttonLabel="Get Started!"
            buttonStyle="bg-pink-600 text-white font-bold py-2 px-14 rounded-lg hover:bg-pink-400"
          />
          <LinkButton
            href="/info"
            buttonLabel="Docs"
            buttonStyle="bg-pink-600 text-white font-bold py-2 px-20 rounded-lg hover:bg-pink-400"
          />
        </div>
      </CardWrapper>
    </div>
  );
};
export default HomePage;
