"use client";

import { usePayable } from "@/context/payable.context";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { DialogFooter } from "../molecules/DialogFooter";
import {
  FormField,
  FormFieldDate,
  FormFieldSelect,
} from "../molecules/FormField";

import {
  payableControllerCreate,
  useAssignorControllerFindMany,
} from "@/services";
import {
  fetchHeadersWithAuthorization,
  headersWithAuthorization,
} from "@/services/header";
import { useTransition } from "react";

const schema = z.object({
  assignorId: z.string().min(2, { message: "O campo Cedente é obrigatório" }),
  value: z
    .string()
    .min(1, { message: "O campo Valor é obrigatório" })
    .transform((val) => parseFloat(val)),
  emissionDate: z
    .string()
    .min(2, { message: "O campo Data é obrigatório" })
    .transform((val) => new Date(val).toISOString()),
});

type SchemaInputs = z.infer<typeof schema>;

type Option = {
  id: string;
  name: string;
};

export const FormPayable = () => {
  const { data, error } = useAssignorControllerFindMany(
    { take: 10, page: 1 },
    {
      fetch: fetchHeadersWithAuthorization(),
    }
  );
  const [isPending, startTransition] = useTransition();

  const deferredData = (data as any)?.data.data;

  const router = useRouter();
  const { setUpdate } = usePayable();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SchemaInputs>({
    resolver: zodResolver(schema),
  });

  const goBack = () => router.back();

  const onSubmit = (formData: SchemaInputs) => {
    startTransition(async () => {
      try {
        await payableControllerCreate(formData, headersWithAuthorization());

        setUpdate(true);
        goBack();
      } catch (error) {
        console.error(error);
      }
    });
  };

  const hasOptions = deferredData && !error;

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="p-4 w-full">
        <FormFieldSelect
          title="Cedente"
          form={{ name: "assignorId", register }}
          options={
            hasOptions
              ? deferredData.map(({ id, name }: Option) => ({
                  key: id,
                  value: id,
                  label: name,
                }))
              : [{ key: "", value: "", label: "Carregando..." }]
          }
          error={errors}
        />
      </div>
      <div className="flex flex-col flex-wrap gap-y-4 bg-gray-200 p-4 w-full md:flex-row md:flex-nowrap md:gap-x-14 md:gap-y-0">
        <FormField
          title="Valor"
          form={{ name: "value", register }}
          error={errors}
        />
        <FormFieldDate
          title="Data"
          form={{ name: "emissionDate", register }}
          error={errors}
        />
      </div>

      {/* // TODO: refactor that component */}
      <DialogFooter
        type="submit"
        label="Cadastrar"
        disabled={isPending}
        goBack={goBack}
      />
    </form>
  );
};
