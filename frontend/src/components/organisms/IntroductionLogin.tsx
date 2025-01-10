import { Button } from "../atoms/Button";
import { Logo } from "../molecules/Logo";

export const IntroductionLogin = () => {
  return (
    <aside className="bg-primary-dark text-white rounded-3xl w-full h-full flex flex-col justify-between md:w-1/2">
      <section 
        aria-label="Platform logo" 
        className="flex justify-center items-center w-full h-full p-12 bg-success rounded-3xl"
      >
        <div role="banner" className="w-full h-full">
          <Logo priority loading="eager" />
        </div>
      </section>
      <section 
        aria-labelledby="registration-section-title"
        className="flex-grow flex flex-col items-center justify-between rounded-3xl bg-primary-dark min-h-28 p-4 gap-y-4 md:gap-y-0 md:px-4 md:flex-row"
      >
        <p id="registration-section-title" className="text-2xl text-white md:pl-4">Junte-se a nós</p>
        <div className="w-full md:w-1/3">
          {/* // TODO: When route /create-account created change to a link */}
          <Button>Cadastrar</Button>
        </div>
      </section>
    </aside>
  );
};
