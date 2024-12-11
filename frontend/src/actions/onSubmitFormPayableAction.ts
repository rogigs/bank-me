"use server";
import { schema } from "@/schemas/schemaFormPayable";

export type FormState = {
  message: string;
  fields?: Record<string, string>;
  issues?: Record<string, string>;
};

export async function onSubmitAction(
  _: FormState,
  data: FormData
): Promise<FormState> {
  const formData = Object.fromEntries(data);
  const parsed = schema.safeParse(formData);

  if (!parsed.success) {
    const fields: Record<string, string> = {};
    for (const key of Object.keys(formData)) {
      const value = formData[key];
      let fieldValue: string;

      if (typeof value === "string") {
        fieldValue = value;
      } else if (value != null) {
        fieldValue = JSON.stringify(value);
      } else {
        fieldValue = "";
      }

      fields[key] = fieldValue;
    }

    return {
      message: "Invalid form data",
      fields,
      issues: parsed.error.issues.reduce((acc, issue) => {
        const field = issue.path[0].toString();
        acc[field] = issue.message;
        return acc;
      }, {} as Record<string, string>),
    };
  }

  return { message: "Valid form data" };
}
