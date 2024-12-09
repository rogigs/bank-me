import { LabelHTMLAttributes } from "react";

type FieldLabel = LabelHTMLAttributes<HTMLLabelElement> & {
  title: string;
};

export const FieldLabel = ({ title, ...props }: FieldLabel) => {
  return (
    <label className="text-lg font-semibold" {...props}>
      {title}
    </label>
  );
};
