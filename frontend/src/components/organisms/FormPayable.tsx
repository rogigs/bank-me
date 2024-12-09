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

import { usePayableControllerCreate } from "@/services";
import { useDeferredValue } from "react";

type Inputs = {
  assignorId: string;
  value: string;
  emissionDate: string;
};

// TODO: fix validations value and emissionDate
const schema = z.object({
  assignorId: z.string().min(2, { message: "O campo Cedente é obrigatório" }),
  value: z.string().min(2, { message: "O campo Valor é obrigatório" }),
  emissionDate: z.string().min(2, { message: "O campo Data é obrigatório" }),
});

export const FormPayable = () => {
  const { data, error } = usePayableControllerCreate();

  // Use deferred value for smoother updates
  const deferredData = useDeferredValue(data?.data);

  const router = useRouter();
  const { setUpdate } = usePayable();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>({
    resolver: zodResolver(schema),
  });

  const goBack = () => router.back();

  const onSubmit = async (formData: any) => {
    const res = await createPayable({
      ...formData,
      value: parseFloat(formData.value),
      emissionDate: new Date(formData.emissionDate),
    });

    if (res instanceof Error) {
      return;
    }

    setUpdate(true);
    goBack();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="p-4 w-full">
        <FormFieldSelect
          title="Cedente"
          form={{ name: "assignorId", register }}
          options={
            deferredData
              ? deferredData.map((option: any) => ({
                  key: option.id,
                  value: option.id,
                  label: option.name,
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
      <DialogFooter type="submit" goBack={goBack} />
    </form>
  );
};
