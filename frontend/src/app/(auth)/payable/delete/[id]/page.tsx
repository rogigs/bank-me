"use client";
import { DialogFooter } from "@/components/molecules/DialogFooter";
import { ROUTE_PARAMS } from "@/constants/routeParams";
import { usePayable } from "@/context/payable.context";
import { payableControllerRemove } from "@/services";
import { headersWithAuthorization } from "@/services/header";
import { useParams, useRouter } from "next/navigation";

const PayableDelete = () => {
  const { id } = useParams<{ [ROUTE_PARAMS.ID]: string }>();
  const route = useRouter();
  const { setUpdate } = usePayable();

  if (!id) {
    return <p>Erro</p>;
  }

  const onConfirm = async () => {
    await payableControllerRemove(id, headersWithAuthorization());
    setUpdate(true);
    route.back();
  };

  return (
    <section className="p-4">
      <h1 className="text-2xl mb-2">Deseja realmente excluir o pagável:</h1>
      <p className="text-primary-dark">{id}</p>
      <DialogFooter
        confirm="Excluir"
        onConfirm={onConfirm}
        goBack={() => route.back()}
      />
    </section>
  );
};

export default PayableDelete;
