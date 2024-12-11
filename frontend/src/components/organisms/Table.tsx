"use client";

import { useSearchParams } from "next/navigation";
import { TableBody } from "../molecules/TableBody";
import { TableFooter } from "../molecules/TableFooter";
import { TableHeader } from "../molecules/TableHeader";

type Table = {
  headers: string[];
  actions: boolean;
  linkToEdit: string;
  error: Error | null;
  bodyContent: Record<string, any>[];
};

export const Table = ({
  headers,
  bodyContent,
  error,
  linkToEdit,
  actions,
}: Table) => {
  const searchParams = useSearchParams();

  const pageFromQuery = parseInt(searchParams.get("page") ?? "1", 10);
  const currentPage = !isNaN(pageFromQuery) ? pageFromQuery : 1;

  return (
    <section className="flex flex-col">
      <article className="overflow-x-auto shadow-md sm:rounded-lg">
        <table className="min-w-full border-collapse rounded-lg table-fixed">
          <TableHeader headers={headers} actions={actions} />

          <TableBody
            content={bodyContent}
            link={linkToEdit}
            error={error}
            actions={actions}
          />
          <TableFooter
            colspan={actions ? headers.length + 3 : headers.length}
            currentPage={currentPage}
          />
        </table>
      </article>
    </section>
  );
};
