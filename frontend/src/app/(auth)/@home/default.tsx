"use client";

import { Button } from "@/components/atoms/Button";
import { HeaderPage } from "@/components/atoms/HeaderPage";
import { Table } from "@/components/organisms/Table";
import { SESSION_STORAGE_KEYS } from "@/constants/sessionStorage";
import {
  getPayableControllerCreateMutationKey,
  payableControllerFindMany,
  usePayableControllerFindMany,
} from "@/services";
import {
  fetchHeadersWithAuthorization,
  headersWithAuthorization,
} from "@/services/header";
import { GetServerSidePropsContext } from "next";
import { useRouter, useSearchParams } from "next/navigation";
import { useDeferredValue, useEffect } from "react";
import { preload } from "swr";

const headers = ["Id", "Nome", "Documento", "Email", "Telefone"];

const PayablePage = () => {
  const searchParams = useSearchParams();

  const savedParams = JSON.parse(
    sessionStorage.getItem(SESSION_STORAGE_KEYS.PAYABLE) ?? "{}"
  ) as {
    page?: number;
    take?: number;
  };

  const pageFromQuery = parseInt(
    searchParams.get("page") ?? `${savedParams.page}`,
    10
  );
  const takeFromQuery = parseInt(
    searchParams.get("take") ?? `${savedParams.take}`,
    10
  );

  const currentPage = !isNaN(pageFromQuery) ? pageFromQuery : 1;
  const currentTake = !isNaN(takeFromQuery) ? takeFromQuery : 10;

  useEffect(() => {
    sessionStorage.setItem(
      SESSION_STORAGE_KEYS.PAYABLE,
      JSON.stringify({ page: currentPage, take: currentTake })
    );
  }, [currentPage, currentTake]);

  // TODO: pass that page to a intercept route  is the best approach
  const { data, error } = usePayableControllerFindMany(
    {
      take: currentTake,
      page: currentPage,
    },
    {
      fetch: fetchHeadersWithAuthorization(),
      swr: {
        dedupingInterval: 120000,
        revalidateOnFocus: false,
        revalidateIfStale: false,
      },
    }
  ) as any;

  preload(
    `${getPayableControllerCreateMutationKey()}?take=${currentTake}&page=${
      currentPage + 1
    }`,
    () =>
      payableControllerFindMany(
        {
          take: currentTake,
          page: currentPage + 1,
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
        currentPage={currentPage}
        actions
      ></Table>
    </>
  );
};

export default PayablePage;

export async function getServerSideProps({ res }: GetServerSidePropsContext) {
  res.setHeader(
    "Cache-Control",
    "public, s-maxage=120, stale-while-revalidate=59"
  );

  return {
    props: {},
  };
}
