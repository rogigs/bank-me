import { HTMLAttributes } from "react";

type FormFieldErrorProps = HTMLAttributes<HTMLSpanElement> & {
  message?: string;
};

export const FormFieldError = ({ message, ...props }: FormFieldErrorProps) => {
  if (!message) return null;

  return (
    <span role="alert" className="text-red-600" {...props}>
      {message}
    </span>
  );
};
