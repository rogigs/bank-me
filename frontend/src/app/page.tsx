import { FormLogin } from "@/components/organisms/FormLogin";
import { IntroductionLogin } from "@/components/organisms/IntroductionLogin";

const App = () => {
  return (
    <main className="flex p-4 w-full max-w-[1440px] mx-auto flex-col gap-y-12 md:flex-row md:justify-between md:h-screen md:p-12 md:gap-x-12">
      <FormLogin />
      <IntroductionLogin />
    </main>
  );
};

export default App;
