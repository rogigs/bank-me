"use client";

import { Button } from "@/components/atoms/Button";
import { HeaderPage } from "@/components/atoms/HeaderPage";
import { Table } from "@/components/organisms/Table";
import {
  assignorControllerFindMany,
  useAssignorControllerFindMany,
} from "@/services";
import {
  fetchHeadersWithAuthorization,
  headersWithAuthorization,
} from "@/services/header";
import { useRouter, useSearchParams } from "next/navigation";
import { useDeferredValue } from "react";
import { preload } from "swr";

const headers = ["Id", "Nome", "Documento", "Email", "Telefone"];

const PayablePage = () => {
  const searchParams = useSearchParams();

  const pageFromQuery = parseInt(searchParams.get("page") ?? "1", 10);
  const takeFromQuery = parseInt(searchParams.get("take") ?? "10", 10);

  const currentPage = !isNaN(pageFromQuery) ? pageFromQuery : 1;
  const currentTake = !isNaN(takeFromQuery) ? takeFromQuery : 10;

  const { data, error } = useAssignorControllerFindMany(
    {
      take: currentTake,
      page: currentPage,
    },
    {
      fetch: fetchHeadersWithAuthorization(),
    }
  ) as any;

  preload(
    `http://localhost:4000/api/v1/integrations/assignor?take=${currentTake}&page=${
      currentPage + 1
    }`,
    () =>
      assignorControllerFindMany(
        {
          take: currentTake,
          page: currentPage,
        },
        headersWithAuthorization()
      )
  );

  const router = useRouter();

  const deferredData = useDeferredValue(data?.data);

  return (
    <>
      <HeaderPage title="Pagáveis" />
      <div className="w-full flex flex-col mb-8 gap-y-4 md:gap-12 md:w-1/3 md:justify-between md:flex-row">
        <Button onClick={() => router.push("/payable/register")}>
          Criar Pagavéis
        </Button>
        <Button onClick={() => router.push("/payable/register/multiples")}>
          Importar pagavéis
        </Button>
      </div>
      <Table
        headers={headers}
        bodyContent={deferredData}
        error={error}
        linkToEdit="/payable"
        actions
      ></Table>
    </>
  );
};

export default PayablePage;
