"use client";

import { ROUTE_PARAMS } from "@/constants/routeParams";
import { usePayableControllerFindOne } from "@/services";
import { fetchHeadersWithAuthorization } from "@/services/header";
import { useParams } from "next/navigation";

type InformationItem = {
  title: string;
  value: string | number | null | undefined;
};

const InformationItem = ({ title, value }: InformationItem) => {
  return (
    <>
      <p className="text-lg font-semibold">{title}</p>
      <p className="text-base">{value ?? "N/A"}</p>
    </>
  );
};

const PayableShowMore = () => {
  const { id } = useParams<{ [ROUTE_PARAMS.ID]: string }>();

  // TODO: fix that in backend
  const { data, error } = usePayableControllerFindOne(
    id,
    {},
    {
      fetch: fetchHeadersWithAuthorization(),
    }
  );
  const deferredData = (data as any)?.data.data;

  if (!id || error) {
    return <p>Erro</p>;
  }

  return (
    <section>
      <article className="p-4 w-full">
        <InformationItem title="Cedente" value={deferredData?.assignorId} />
      </article>
      <article className="flex flex-col gap-y-4 bg-gray-200 p-4 w-full md:flex-row md:gap-x-14  rounded-bl-lg rounded-br-lg">
        <section className="flex-1">
          <InformationItem title="Valor" value={deferredData?.value} />
        </section>
        <section className="flex-1">
          <InformationItem
            title="Dt. de Emissão"
            value={deferredData?.emissionDate}
          />
        </section>
      </article>
    </section>
  );
};

export default PayableShowMore;
