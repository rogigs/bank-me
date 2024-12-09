"use client";

import { Dialog } from "@/components/organisms/Dialog";
import { Sidebar } from "@/components/organisms/Sidebar";
import { useAuthControllerGetProfile } from "@/services";
import { usePathname, useRouter } from "next/navigation";

const DashboardLayout = ({
  children,
  home,
}: {
  children: React.ReactNode;
  home: React.ReactNode;
}) => {
  const router = useRouter();
  const pathname = usePathname();

  const { data, error } = useAuthControllerGetProfile({
    swr: {
      onError: () => {
        router.push("/");
      },
    },
  });

  if (error) {
    return <p>Error layout</p>;
  }

  const isPayableRoot = pathname === "/payable";

  return (
    <Sidebar>
      {!isPayableRoot && (
        <Dialog
          label="Criar pagavéis"
          title="Pagavéis"
          confirm="Cadastrar"
          cancel="Cancelar"
          dialogForm
        >
          {children}
        </Dialog>
      )}
      {home}
    </Sidebar>
  );
};

export default DashboardLayout;
