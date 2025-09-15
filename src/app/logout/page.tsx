"use client";

import { routes } from "@/shared/routes";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Page(): null {
  const router = useRouter();

  useEffect(() => {
    signOut({ redirect: false });
    router.push(routes.signIn.url());
  }, []);

  return null;
}
