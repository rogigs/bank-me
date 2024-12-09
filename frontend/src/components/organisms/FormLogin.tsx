"use client";

import { LOCAL_STORAGE_KEYS } from "@/constants/localStorage";
import { authControllerSignIn } from "@/services";
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

  const onSubmit = async (form: any) => {
    try {
      const { data } = await authControllerSignIn(form);

      // TODO: fix that in orval
      localStorage.setItem(
        LOCAL_STORAGE_KEYS.TOKEN,
        (data as any).data?.accessToken
      );
      router.push("/payable");
    } catch (error) {
      console.log("🚀 ~ onSubmit ~ error:", error);
    }
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
        title="Email"
        placeholder="Digite seu login..."
        form={{ name: "email", register }}
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
