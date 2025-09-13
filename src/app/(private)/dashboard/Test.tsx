"use client";

import { useLogout } from "@/shared/hooks/useLogout";
import { Button } from "@/shared/ui/Button";
import { ReactElement } from "react";

interface Props {
  className?: string;
}

export const Test = (props: Props): ReactElement => {
  const logout = useLogout();

  return (
    <div className={props.className}>
      <Button
        onClick={async () => {
          await logout();
        }}
        className="mt-10"
      >
        logout
      </Button>
    </div>
  );
};
