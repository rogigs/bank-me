type TableLine = {
  content: string | number;
};

export const TableLine = ({ content }: TableLine) => (
  <td className="py-4 px-6 text-sm font-medium text-primary-dark whitespace-nowrap">
    {content}
  </td>
);
