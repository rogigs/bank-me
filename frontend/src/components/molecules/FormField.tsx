import { Field, FieldSelect } from "../atoms/Field";
import { FormFieldError } from "../atoms/FieldError";
import { FieldLabel } from "../atoms/FieldLabel";

export const FormField = ({ title, form, error, ...props }: any) => {
  return (
    <fieldset className="w-full">
      <FieldLabel title={title} htmlFor={form.name} />
      <Field
        type="text"
        form={form}
        aria-describedby={`${form.name}-error`}
        {...props}
      />
      <FormFieldError message={error} />
    </fieldset>
  );
};

export const FormFieldSelect = ({
  title,
  form,
  options,
  error,
  ...props
}: any) => {
  return (
    <fieldset className="w-full">
      <FieldLabel title={title} htmlFor={form.name} />
      <FieldSelect
        form={form}
        options={options}
        aria-describedby={`${form.name}-error`}
        {...props}
      />
      <FormFieldError message={error[form.name]?.message} />
    </fieldset>
  );
};
