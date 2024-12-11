"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm } from "react-hook-form";
import { DialogFooter } from "../molecules/DialogFooter";
import { FormField, FormFieldSelect } from "../molecules/FormField";

import { onSubmitAction } from "@/actions/onSubmitFormPayableAction";
import { SESSION_STORAGE_KEYS } from "@/constants/sessionStorage";
import { fields, schema, SchemaInputs } from "@/schemas/schemaFormPayable";
import {
  getPayableControllerCreateMutationKey,
  payableControllerCreate,
  useAssignorControllerFindMany,
} from "@/services";
import {
  fetchHeadersWithAuthorization,
  headersWithAuthorization,
} from "@/services/header";
import { PayableNoBaseModelDTO } from "@/services/index.schemas";
import { useRouter } from "next/navigation";
import {
  useActionState,
  useDeferredValue,
  useEffect,
  useRef,
  useTransition,
} from "react";
import { mutate } from "swr";

type Option = {
  id: string;
  name: string;
};

export const FormPayable = () => {
  const [state, formAction] = useActionState(onSubmitAction, {
    message: "",
  });
  const router = useRouter();

  const { data, error } = useAssignorControllerFindMany(
    { take: 10, page: 1 },
    {
      fetch: fetchHeadersWithAuthorization(),
    }
  ) as any;

  const [isPending, startTransition] = useTransition();

  const deferredData = useDeferredValue(data?.data);

  const form = useForm<SchemaInputs>({
    resolver: zodResolver(schema),
  });

  useEffect(() => {
    if (state.message == "Valid form data") {
      (async () => {
        try {
          // TODO: see https://nextjs.org/docs/app/building-your-application/routing/route-handlers
          console.log("Hire");
          const formData = new FormData(formRef.current!);
          const formObject: Record<string, any> = {};
          formData.forEach((value, key) => {
            if (key === fields.emissionDate) {
              formObject[key] = new Date(value as string);
            } else if (key === fields.value) {
              formObject[key] = Number(value);
            } else {
              formObject[key] = value;
            }
          });

          await payableControllerCreate(
            formObject as unknown as PayableNoBaseModelDTO,
            headersWithAuthorization()
          );

          const savedParams = JSON.parse(
            sessionStorage.getItem(SESSION_STORAGE_KEYS.PAYABLE) ?? "{}"
          ) as {
            page?: number;
            take?: number;
          };

          mutate(
            `${getPayableControllerCreateMutationKey()}?take=${
              savedParams.take
            }&page=${savedParams?.page}`,
            (currentData = []) => [...currentData, formObject]
          );

          router.back();
        } catch (error) {
          console.error(error);
        }
      })();
    }
  }, [state]);

  const formRef = useRef<HTMLFormElement>(null);

  const hasOptions = deferredData && !error;

  return (
    <FormProvider {...form}>
      <form
        ref={formRef}
        action={formAction}
        onSubmit={(evt) => {
          evt.preventDefault();
          form.handleSubmit(() => {
            startTransition(() => {
              formAction(new FormData(formRef.current!));
            });
          })(evt);
        }}
      >
        <div className="p-4 w-full">
          <FormFieldSelect
            title="Cedente"
            form={{ name: fields.assignorId, register: form.register }}
            options={
              hasOptions
                ? deferredData.map(({ id, name }: Option) => ({
                    key: id,
                    value: id,
                    label: name,
                  }))
                : [{ key: "", value: "", label: "Carregando..." }]
            }
            error={"errors"}
          />
        </div>
        <div className="flex flex-col flex-wrap gap-y-4 bg-gray-200 p-4 w-full md:flex-row md:flex-nowrap md:gap-x-14 md:gap-y-0">
          <FormField
            title="Valor"
            form={{ name: fields.value, register: form.register }}
            error={state.issues?.value}
          />
          <FormField
            type="date"
            title="Data"
            form={{ name: fields.emissionDate, register: form.register }}
            error={state.issues?.emissionDate}
          />
        </div>

        {/* // TODO: refactor that component */}
        <DialogFooter
          type="submit"
          label="Cadastrar"
          disabled={isPending}
          goBack={() => {}}
        />
      </form>
    </FormProvider>
  );
};
