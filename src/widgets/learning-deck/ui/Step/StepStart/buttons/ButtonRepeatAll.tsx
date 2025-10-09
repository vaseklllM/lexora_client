"use client";

import { ButtonIcon } from "@/shared/ui/ButtonIcon";
import { useLearningDeckStore } from "@/widgets/learning-deck/model/store";
import { ReactElement } from "react";
import { buttonClassesSlots } from "./classes";

interface Props {
  className?: string;
  numberOfCardsInProgress: number;
}

export const ButtonRepeatAll = (props: Props): ReactElement => {
  const openModalChooseReviewType = useLearningDeckStore(
    (state) => state.openModalChooseReviewType,
  );

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
        onClick={() => {
          openModalChooseReviewType();
        }}
      />
      <p className={classes.title()}>
        Repeat All ({props.numberOfCardsInProgress})
      </p>
    </div>
  );
};
