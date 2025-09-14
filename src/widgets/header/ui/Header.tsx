"use client";

import { useLogout } from "@/shared/hooks/useLogout";
import { Button } from "@/shared/ui/Button";
import { tv } from "tailwind-variants";

const classesSlots = tv({
  slots: {
    header: "bg-base-300 flex items-center justify-between p-4",
  },
});

interface Props {
  userName: string;
}

export const Header = (props: Props) => {
  const classes = classesSlots();
  const logout = useLogout();

  return (
    <div className={classes.header()}>
      <p className="text-base-content/90">{props.userName}</p>
      <Button
        onClick={async () => {
          await logout();
        }}
        className="btn-sm"
        btnType="neutral"
      >
        Logout
      </Button>
    </div>
  );
};
