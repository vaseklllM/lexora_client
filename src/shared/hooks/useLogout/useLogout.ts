"use client";

import { signOut } from "next-auth/react";
// import { usePathname } from "next/navigation";
import { useCallback } from "react";
import { logout } from "./logout";
import { logoutRevalidate } from "./logoutRevalidate";

export function useLogout() {
  // const pathname = usePathname();

  return useCallback(async () => {
    await logout();
    await signOut({ redirect: false });
    logoutRevalidate();
  }, []);
}
