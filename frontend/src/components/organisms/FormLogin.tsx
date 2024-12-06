"use client";

import { authenticate } from "@/services";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { Button } from "../atoms/Button";
import { FormField } from "../molecules/FormField";

export const FormLogin = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const router = useRouter();

  const onSubmit = async (data: any) => {
    const authenticated = await authenticate(data);
    if (authenticated instanceof Error) {
      return;
    }

    localStorage.setItem("token", authenticated.access_token);

    router.push("/payable");
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-12 h-full w-full md:w-1/2"
    >
      <h1 className="text-6xl text-end break-words">
        <span className="font-bold text-primary">Bankme</span> o seu banco
        preferido!
      </h1>

      <FormField
        title="Login"
        placeholder="Digite seu login..."
        form={{ name: "login", register }}
        error={errors}
      />
      <FormField
        title="Senha"
        type="password"
        placeholder="Digite sua senha..."
        form={{ name: "password", register }}
        error={errors}
      />

      <div className="flex flex-col gap-y-4 justify-between md:flex-row md:items-center ">
        <a
          href="#"
          className="text-2xl text-primary-dark underline"
          aria-label="Esqueceu sua senha? Clique para recuperar."
        >
          Esqueceu sua senha?
        </a>
        <div className="w-full md:w-1/3">
          <Button type="submit">Logar</Button>
        </div>
      </div>
    </form>
  );
};
