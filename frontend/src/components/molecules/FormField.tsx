import { Field, FieldSelect } from "../atoms/Field";
import { FormFieldError } from "../atoms/FieldError";
import { FieldLabel } from "../atoms/FieldLabel";

export const FormField = ({
  title,
  form,
  error,
  required = false,
  ...props
}: any) => {
  const ariaDescribedby = `field-${form.name}`;
  return (
    <p className="w-full">
      <FieldLabel title={title} htmlFor={form.name} />
      <Field
        type="text"
        form={form}
        aria-describedby={ariaDescribedby}
        aria-required={String(required)}
        {...props}
      />
      <FormFieldError message={error} id={ariaDescribedby} />
    </p>
  );
};

export const FormFieldSelect = ({
  title,
  form,
  options,
  error,
  ...props
}: any) => {
  const ariaDescribedby = `field-${form.name}`;

  return (
    <p className="w-full">
      <FieldLabel title={title} htmlFor={form.name} />
      <FieldSelect
        form={form}
        options={options}
        aria-describedby={ariaDescribedby}
        {...props}
      />
      <FormFieldError
        message={error[form.name]?.message}
        id={ariaDescribedby}
      />
    </p>
  );
};
