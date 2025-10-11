"use client";

import { useLogout } from "@/shared/hooks/useLogout";
import { Button } from "@/shared/ui/Button";
import { ReactElement } from "react";

export const ButtonLogout = (): ReactElement => {
  const logout = useLogout();

  return (
    <Button
      onClick={async () => {
        await logout();
      }}
      className="btn-sm btn-soft hidden sm:block"
    >
      Logout
    </Button>
  );
};
