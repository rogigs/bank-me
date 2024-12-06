import { Button } from "@/components/atoms/Button";
import { Table } from "@/components/organisms/Table";
import { useRouter } from "next/navigation";
import { usePayableMany } from "./hooks/usePayableMany";

const header = [
  { key: "id", value: "id" },
  { key: "value", value: "Valor" },
  { key: "emissionDate", value: "Dt. de Emissão" },
];

export const Payable = () => {
  const { deferredPayable } = usePayableMany();

  const router = useRouter();

  return (
    <div>
      <div className="w-full flex flex-col mb-8 gap-y-4 md:gap-12 md:w-1/3 md:justify-between md:flex-row">
        <Button onClick={() => router.push("/payable/register")}>
          Criar Pagavéis
        </Button>
        <Button> Importar pagavéis</Button>
      </div>
      <Table
        headerContent={header}
        bodyContent={deferredPayable}
        linkToEdit="/payable"
      ></Table>
    </div>
  );
};
