"use client";

import { ButtonIcon } from "@/shared/ui/ButtonIcon";
import { ReactElement, useCallback, useState } from "react";
import { tv } from "tailwind-variants";

const classesSlots = tv({
  slots: {
    base: "",
  },
});

interface Props {
  className?: string;
}

export const HeaderMenu = (props: Props): ReactElement => {
  const classes = classesSlots();

  const [isActive, setIsActive] = useState(false);

  const toggleMenu = useCallback(() => {
    setIsActive(!isActive);
  }, [isActive]);

  return (
    <div className={classes.base({ className: props.className })}>
      <ButtonIcon
        icon="menu"
        variant="outline"
        color="primary"
        isActive={isActive}
        onClick={toggleMenu}
      />
    </div>
  );
};
