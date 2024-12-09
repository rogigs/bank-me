import { HTMLAttributes } from "react";

type FormFieldErrorProps = HTMLAttributes<HTMLSpanElement> & {
  message: string | undefined;
};

export const FormFieldError = ({ message, ...props }: FormFieldErrorProps) => {
  if (!message) return null;

  return (
    <span role="alert" className="text-red-500" {...props}>
      {message}
    </span>
  );
};
