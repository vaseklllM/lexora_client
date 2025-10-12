"use client";

import { useLogout } from "@/shared/hooks/useLogout";
import { useTranslation } from "@/shared/hooks/useTranslation";
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
  const { t } = useTranslation();

  return (
    <Button
      onClick={async () => {
        await logout();
      }}
      size="sm"
      variant="soft"
      className={classes.button({ className: props.className })}
    >
      {t("header.buttons.logout")}
    </Button>
  );
};
