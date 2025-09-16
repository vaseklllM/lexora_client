"use client";

import { logout } from "@/api/auth/logout";
import { signOut } from "next-auth/react";
import { useCallback } from "react";
import { logoutRevalidate } from "./logoutRevalidate";

export function useLogout() {
  return useCallback(async () => {
    await logout();
    await signOut({ redirect: false });
    logoutRevalidate();
  }, []);
}
