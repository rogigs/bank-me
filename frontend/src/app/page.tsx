import { FormLogin } from "@/components/organisms/FormLogin";
import { IntroductionLogin } from "@/components/organisms/IntroductionLogin";

const App = () => {
  return (
    <div className="mx-auto max-w-screen-xl h-screen">
      <main className="flex p-4 w-full flex-col gap-y-12 md:flex-row md:justify-between md:h-screen md:p-12 md:gap-x-12 ">
        <FormLogin />
        <IntroductionLogin />
      </main>
    </div>
  );
};

export default App;
