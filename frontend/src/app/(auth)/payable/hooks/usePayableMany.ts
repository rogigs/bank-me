import { fetcher } from "@/services/authenticatedFetch";
import { useDeferredValue } from "react";
import useSWR from "swr";

export const usePayableMany = () => {
  const { data, error } = useSWR(
    `http://localhost:4000/v1/integrations/assignor?take=10&page=1`,
    fetcher
  );
  const deferredPayable = useDeferredValue(data);

  return { deferredPayable };
};
