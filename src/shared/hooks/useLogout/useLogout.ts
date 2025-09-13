"use client";

import { signOut } from "next-auth/react";
// import { usePathname } from "next/navigation";
import { useCallback } from "react";
import { logout } from "./logout";

export function useLogout() {
  // const pathname = usePathname();

  return useCallback(async () => {
    await signOut({ redirect: false });
    logout();
  }, []);
}
