import { z } from "zod";

export const fields = {
  assignorId: "assignorId",
  value: "value",
  emissionDate: "emissionDate",
} as const;

export const schema = z.object({
  [fields.assignorId]: z
    .string()
    .min(2, { message: "O campo Cedente é obrigatório" }),
  [fields.value]: z
    .string()
    .trim()
    .min(1, { message: "O campo Valor é obrigatório" })
    .transform((val) => parseFloat(val)),
  [fields.emissionDate]: z
    .string()
    .trim()
    .min(2, { message: "O campo Data é obrigatório" })
    .transform((val) => new Date(val).toISOString()),
});

export type SchemaInputs = z.output<typeof schema>;
