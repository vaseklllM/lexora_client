"use client";

import { ButtonIcon } from "@/shared/ui/ButtonIcon";
import { useLearningDeckStore } from "@/widgets/learning-deck/model/store";
import { ReactElement } from "react";
import { buttonClassesSlots } from "./classes";
import { useTranslation } from "@/shared/hooks/useTranslation";

interface Props {
  className?: string;
  numberOfCardsNeedToReview: number;
}

export const ButtonRepeat = (props: Props): ReactElement => {
  const openModalChooseReviewType = useLearningDeckStore(
    (state) => state.openModalRepeatGameType,
  );
  const { t } = useTranslation();
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
        {t("learning_deck.step.start.button_repeat.title", {
          numberOfCardsNeedToReview: props.numberOfCardsNeedToReview,
        })}
      </p>
    </div>
  );
};
