"use client";

import { ButtonIcon } from "@/shared/ui/ButtonIcon";
import { ReactElement, ReactNode, useCallback, useState } from "react";
import { tv } from "tailwind-variants";
import styles from "./style.module.scss";

const classesSlots = tv({
  slots: {
    base: "dropdown dropdown-end dropdown-bottom group",
    button: "",
    menu: "dropdown-content menu bg-base-100 rounded-box z-1 mt-2 w-52 p-2 shadow-sm",
  },
});

interface Props {
  className?: string;
  children: ReactNode;
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
        tabIndex={0}
        className={classes.button({ className: styles.button })}
      />
      <div tabIndex={0} className={classes.menu()}>
        {props.children}
      </div>
    </div>
  );
};
