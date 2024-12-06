"use client";

import { Sidebar } from "@/components/organisms/Sidebar";
import { authenticated } from "@/services";
import { Children } from "@/types/children";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const DashboardLayout = ({ children }: Children) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState<object | Error>();
  const router = useRouter();

  useEffect(() => {
    (async () => {
      setIsAuthenticated(await authenticated());
    })();
  }, []);

  // if (isAuthenticated instanceof Error) {
  //   router.push("/");
  //   return null;
  // }

  return <Sidebar>{children} </Sidebar>;
};

export default DashboardLayout;
