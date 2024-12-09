"use client";

import { Sidebar } from "@/components/organisms/Sidebar";
import { useAuthControllerGetProfile } from "@/services";
import { Children } from "@/types/children";
import { useRouter } from "next/navigation";

const DashboardLayout = ({ children }: Children) => {
  const router = useRouter();

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

  if (!data) {
    return <p>Carregando layout...</p>;
  }

  return <Sidebar>{children}</Sidebar>;
};

export default DashboardLayout;
