"use client";

import { useLogout } from "@/shared/hooks/useLogout";
import { Button } from "@/shared/ui/Button";
import { ReactElement } from "react";
import { tv } from "tailwind-variants";

const classesSlots = tv({
  slots: {
    button: "",
  },
});

interface Props {
  className?: string;
}

export const ButtonLogout = (props: Props): ReactElement => {
  const logout = useLogout();
  const classes = classesSlots();

  return (
    <Button
      onClick={async () => {
        await logout();
      }}
      size="sm"
      variant="soft"
      className={classes.button({ className: props.className })}
    >
      Logout
    </Button>
  );
};
