// TODO: could be improved in a one component
import { InputHTMLAttributes, SelectHTMLAttributes } from "react";
import { UseFormRegisterReturn } from "react-hook-form";

// TODO: get the state of UseForm correct
type Form = {
  name: string;
  register: (name: string) => UseFormRegisterReturn;
};

type Field = InputHTMLAttributes<HTMLInputElement> & {
  form: Form;
};

type Option = {
  key: string | number;
  value: string | number;
  label: string | number;
};

type FieldSelect = SelectHTMLAttributes<HTMLSelectElement> & {
  options: Option[];
  form: Form;
};

export const Field = ({ form, ...props }: Field) => {
  return (
    <input
      className="w-full mt-4 py-2 px-4 h-16 rounded-xl border border-gray-300 focus:outline-none focus:border-success focus:shadow-xl"
      {...props}
      {...form.register(form.name)}
    />
  );
};

export const FieldSelect = ({ form, options, ...props }: FieldSelect) => {
  return (
    <select
      className="w-full mt-4 py-2 px-4 h-16 rounded-xl border border-gray-300 focus:outline-none focus:border-success focus:shadow-xl"
      {...props}
      {...form.register(form.name)}
    >
      <option value="">Selecione...</option>
      {options.map((option: Option) => (
        <option key={option.key} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
};
