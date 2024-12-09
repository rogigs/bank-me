"use client";

import { LOCAL_STORAGE_KEYS } from "@/constants/localStorage";
import { useRouter } from "next/navigation";

const LogOut = () => {
  const router = useRouter();

  if (typeof window !== "undefined") {
    localStorage.setItem(LOCAL_STORAGE_KEYS.TOKEN, "");
  }

  router.push("/");

  return <></>;
};

export default LogOut;
