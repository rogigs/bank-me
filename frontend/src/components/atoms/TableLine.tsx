import { Link } from "./Link";

type TableLine = {
  edit?: boolean;
  content: any; // TODO: to fix
  keys?: string[];
  link?: string; // TODO: add type conditional
  showMore?: boolean;
  exclude?: boolean;
};

type ContentItem = {
  key: string;
  value: string | number;
};

// TODO: simplify implementation
export const TableLine = ({
  edit,
  content,
  keys,
  link,
  showMore,
  exclude,
}: TableLine) => {
  const { id } = content;
  return (
    <tr {...(edit && { className: "hover:bg-success" })}>
      {keys
        ? keys.map((key: any) => (
            <td
              key={`${key}-${content}`}
              className="py-4 px-6 text-sm font-medium text-primary-dark whitespace-nowrap"
            >
              {content[key]}
            </td>
          ))
        : content.map(({ key, value }: ContentItem) => (
            <td
              key={key}
              className="py-4 px-6 text-sm font-medium text-primary-dark whitespace-nowrap"
            >
              {value}
            </td>
          ))}
      <td className="py-4 px-6 text-sm font-medium text-right whitespace-nowrap space-x-4">
        {edit && <Link href={`${link}/edit/${id}`} label="Editar" />}
        {showMore && <Link href={`${link}/show-more/${id}`} label="Ver Mais" />}
        {exclude && <Link href={`${link}/delete/${id}`} label="Excluir" />}
      </td>
    </tr>
  );
};
