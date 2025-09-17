"use client";

import { routes } from "@/shared/routes";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export function Logout(): null {
  const router = useRouter();

  useEffect(() => {
    (async () => {
      await signOut({ redirect: false });
      router.push(routes.signIn.url());
    })();
  }, []);

  return null;
}
