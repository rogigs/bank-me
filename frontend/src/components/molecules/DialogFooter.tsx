import { ButtonHTMLAttributes } from "react";
import { Button } from "../atoms/Button";

type DialogFooter = ButtonHTMLAttributes<HTMLButtonElement> & {
  goBack: () => void;
  label: string;
};

export const DialogFooter = ({ goBack, label, ...props }: DialogFooter) => {
  return (
    <footer className="flex flex-col md:flex-row items-center p-4 md:p-5  rounded-b justify-end w-full gap-y-4 md:gap-x-12">
      <div className="w-full md:w-2/6">
        <Button onClick={goBack} secondary>
          Cancelar
        </Button>
      </div>
      <div className="w-full md:w-2/6">
        <Button {...props}>{label}</Button>
      </div>
    </footer>
  );
};
