"use client";

import { ButtonIcon } from "@/shared/ui/ButtonIcon";
import { ReactElement } from "react";
import { buttonClassesSlots } from "./classes";

interface Props {
  className?: string;
  numberOfCardsInProgress: number;
}

export const ButtonRepeatAll = (props: Props): ReactElement => {
  const classes = buttonClassesSlots({
    type: "repeatAll",
  });

  return (
    <div className={classes.base({ className: props.className })}>
      <ButtonIcon
        icon="repeat"
        color="primary"
        className={classes.button()}
        iconWidth="48px"
        iconHeight="48px"
      />
      <p className={classes.title()}>
        Repeat All ({props.numberOfCardsInProgress})
      </p>
    </div>
  );
};
