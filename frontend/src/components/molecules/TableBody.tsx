import { Suspense } from "react";
import { TableLine } from "../atoms/TableLine";
import { TableLineActions } from "../atoms/TableLineActions";
import { TableLineError } from "../atoms/TableLineError";

type TableBody = {
  content: Record<string, any>[];
  link: string;
  error: any;
  actions: boolean;
};

export const TableBody = ({
  content = [],
  link,
  error,
  actions,
}: TableBody) => {
  return (
    <tbody className="bg-white divide-y divide-gray-200">
      {error ? (
        <TableLineError colspan={content.length} />
      ) : (
        <Suspense fallback={<p>Loading...</p>}>
          {content.length > 0
            ? content.map((row: any) => {
                return (
                  <tr key={row.id} className="hover:bg-success w-full">
                    {Object.entries(row).map(([key, value]) => (
                      <TableLine
                        key={row.id + key}
                        content={value as string | number}
                      />
                    ))}
                    {actions && <TableLineActions link={link} id={row.id} />}
                  </tr>
                );
              })
            : null}
        </Suspense>
      )}
    </tbody>
  );
};
