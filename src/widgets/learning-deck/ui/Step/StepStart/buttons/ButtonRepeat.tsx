"use client";

import { ButtonIcon } from "@/shared/ui/ButtonIcon";
import { useLearningDeckStore } from "@/widgets/learning-deck/model/store";
import { ReactElement } from "react";
import { buttonClassesSlots } from "./classes";

interface Props {
  className?: string;
  numberOfCardsNeedToReview: number;
}

export const ButtonRepeat = (props: Props): ReactElement => {
  const openModalChooseReviewType = useLearningDeckStore(
    (state) => state.openModalChooseReviewType,
  );

  const classes = buttonClassesSlots({
    type: "repeat",
  });

  return (
    <div className={classes.base({ className: props.className })}>
      <ButtonIcon
        icon="repeat"
        color="primary"
        className={classes.button()}
        iconWidth="=48px"
        iconHeight="48px"
        onClick={() => {
          openModalChooseReviewType();
        }}
      />
      <p className={classes.title()}>
        Repeat ({props.numberOfCardsNeedToReview})
      </p>
    </div>
  );
};
