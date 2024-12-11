import { TableLine } from "../atoms/TableLine";

type TableHeader = {
  headers: string[];
  actions: boolean;
};

export const TableHeader = ({ headers = [], actions }: TableHeader) => {
  return (
    <thead className="bg-gray-200">
      <tr>
        {headers.map((content) => (
          <TableLine key={content} content={content} />
        ))}
        {actions && (
          <>
            <td></td>
            <td></td>
            <td></td>
          </>
        )}
      </tr>
    </thead>
  );
};
