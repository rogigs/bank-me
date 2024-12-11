type TableLineError = {
  colspan: number;
};

export const TableLineError = ({ colspan }: TableLineError) => {
  return (
    <tr className="bg-red-500 text-white">
      <td colSpan={colspan} className="text-center py-4">
        Ocorreu um erro ao carregar os dados.
      </td>
    </tr>
  );
};
