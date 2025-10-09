"use client";

import { ButtonIcon } from "@/shared/ui/ButtonIcon";
import { useLearningDeckStore } from "@/widgets/learning-deck/model/store";
import { ReactElement } from "react";
import { tv } from "tailwind-variants";

const classesSlots = tv({
  slots: {
    base: "flex flex-col items-center justify-center gap-4",
    button: "dark:btn-soft btn-outline h-28 w-28 md:h-28 md:w-28",
    title: "text-base-content/80 text-lg font-bold",
  },
  variants: {
    isCardsToReview: {
      true: {
        button: "btn-primary",
      },
    },
  },
});

interface Props {
  className?: string;
  deckId: string;
  numberOfCardsNeedToReview: number;
}

export const ButtonRepeat = (props: Props): ReactElement => {
  const openModalChooseReviewType = useLearningDeckStore(
    (state) => state.openModalChooseReviewType,
  );

  const isCardsToReview = props.numberOfCardsNeedToReview > 0;

  const classes = classesSlots({
    isCardsToReview,
  });

  return (
    <div className={classes.base()}>
      <ButtonIcon
        icon="repeat"
        className={classes.button()}
        iconWidth="58px"
        iconHeight="58px"
        onClick={() => {
          openModalChooseReviewType();
        }}
      />
      <p className={classes.title()}>Repeat</p>
    </div>
  );
};
