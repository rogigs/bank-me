import { Link } from "./Link";

type TableActions = {
  link: string;
  id: string;
};

export const TableLineActions = ({ link, id }: TableActions) => {
  return (
    <td className="py-4 px-6 text-sm font-medium text-right whitespace-nowrap space-x-4">
      <Link href={`${link}/edit/${id}`} label="Editar" />
      <Link href={`${link}/show-more/${id}`} label="Ver Mais" />
      <Link href={`${link}/delete/${id}`} label="Excluir" />
    </td>
  );
};
