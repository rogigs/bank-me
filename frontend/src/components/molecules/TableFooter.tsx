import { Link } from "../atoms/Link";

type TableFooter = {
  colspan: number;
  currentPage: number;
};

export const TableFooter = ({ colspan, currentPage }: TableFooter) => {
  return (
    <tfoot>
      <tr>
        <td
          colSpan={colspan}
          className="py-4 px-6 text-sm font-medium text-right whitespace-nowrap space-x-4"
        >
          <nav>
            <Link
              href={{
                query: {
                  take: 10,
                  page: currentPage - 1 === 0 ? currentPage : currentPage - 1,
                },
              }}
              passHref
              aria-disabled={currentPage === 1}
              label="Previous"
            />

            <span className="px-4 py-2">{currentPage}</span>
            <Link
              href={{
                query: { take: 10, page: currentPage + 1 },
              }}
              passHref
              label="Next"
              prefetch
            />
          </nav>
        </td>
      </tr>
    </tfoot>
  );
};
