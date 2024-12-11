import { z } from "zod";

export const fields = {
  email: "email",
  password: "password",
} as const;

export const schema = z.object({
  [fields.email]: z
    .string()
    .trim()
    .email({ message: "O Email fornecido é inválido" })
    .min(2, { message: "O campo Email é obrigatório" }),
  [fields.password]: z
    .string()
    .trim()
    .min(1, { message: "O campo Senha é obrigatório" }),
});

export type SchemaInputs = z.output<typeof schema>;
