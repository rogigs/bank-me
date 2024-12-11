"use client";

import { LOCAL_STORAGE_KEYS } from "@/constants/localStorage";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const LogOut = () => {
  const router = useRouter();

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem(LOCAL_STORAGE_KEYS.TOKEN, "");
    }
  }, []);

  router.push("/");

  return <></>;
};

export default LogOut;
