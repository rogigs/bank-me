"use client";

import { onSubmitAction } from "@/actions/onSubmitFormLoginAction";
import { fields, SchemaInputs } from "@/schemas/schemaFormLogin";
import { useRouter } from "next/navigation";
import { startTransition, useActionState, useEffect, useRef } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { Button } from "../atoms/Button";
import { FormField } from "../molecules/FormField";

export const FormLogin = () => {
  const [state, formAction] = useActionState(onSubmitAction, {
    message: "",
  });

  const form = useForm<SchemaInputs>();

  const formRef = useRef<HTMLFormElement>(null);

  const router = useRouter();

  useEffect(() => {
    if (state?.data) {
      (async () => {
        try {
          const response = await fetch("/api/signin", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(state.data),
          });

          if (response.ok) {
            router.push("/payable?take=10&page=1");
            return;
          }
          const errorData = await response.json();
          console.error("Error response:", errorData);
        } catch (error) {
          console.error("Error during authentication:", error);
        }
      })();
    }
  }, [state?.data, router]);

  return (
    <FormProvider {...form}>
      <form
        ref={formRef}
        action={formAction}
        className="flex flex-col gap-12"
        onSubmit={(evt) => {
          evt.preventDefault();
          form.handleSubmit(() => {
            startTransition(() => {
              formAction(new FormData(formRef.current!));
            });
          })(evt);
        }}
      >
        <FormField
          title="Email"
          placeholder="Digite seu email..."
          form={{ name: fields.email, register: form.register }}
          error={state.issues?.email}
          autoComplete="email"
          required
        />
        <FormField
          title="Senha"
          type="password"
          placeholder="Digite sua senha..."
          form={{ name: fields.password, register: form.register }}
          error={state.issues?.password}
          required
        />
        <div className="flex flex-col gap-y-4 justify-between md:flex-row md:items-center ">
          <a href="#" className="text-2xl text-primary-dark underline">
            Esqueceu sua senha?
          </a>
          <div className="w-full md:w-1/3">
            <Button type="submit">Logar</Button>
          </div>
        </div>
      </form>
    </FormProvider>
  );
};
