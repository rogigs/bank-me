"use client";

import { Button } from "@/components/atoms/Button";
import { Table } from "@/components/organisms/Table";
import { useAssignorControllerFindMany } from "@/services";
import { fetchHeadersWithAuthorization } from "@/services/header";
import { useRouter } from "next/navigation";
import { useDeferredValue } from "react";

const header = [
  { key: "id", value: "id" },
  { key: "value", value: "Valor" },
  { key: "emissionDate", value: "Dt. de Emissão" },
];

const PayablePage = () => {
  const { data, error } = useAssignorControllerFindMany(
    { take: 10, page: 1 },
    {
      fetch: fetchHeadersWithAuthorization(),
    }
  );

  const router = useRouter();

  const deferredData = useDeferredValue(data);

  if (error) {
    return <p>Error</p>;
  }

  if (!data) {
    return <p>Carregando...</p>;
  }

  return (
    <div>
      <div className="w-full flex flex-col mb-8 gap-y-4 md:gap-12 md:w-1/3 md:justify-between md:flex-row">
        <Button onClick={() => router.push("/payable/register")}>
          Criar Pagavéis
        </Button>
        <Button onClick={() => router.push("/payable/register/multiples")}>
          Importar pagavéis
        </Button>
      </div>
      <Table
        headerContent={header}
        bodyContent={deferredData}
        linkToEdit="/payable"
      ></Table>
    </div>
  );
};

export default PayablePage;
